import { getAuth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/clerk-sdk-node'
import clientPromise from './mongodb'
import { User } from '../types/user'

export async function getCompleteUser(req: any) {
  const { userId } = getAuth(req)

  if (!userId) return null

  const client = await clientPromise
  const db = client.db('cyber_training')
  const User = db.collection<User>('user')

  // Get the extended profile
  const profile = await User.findOne({ id: userId })

  // If profile doesn't exist yet, create it
  if (!profile) {
    const user = await clerkClient.users.getUser(userId)

    const email = user.emailAddresses[0]?.emailAddress
    const name = [user.firstName, user.lastName].filter(Boolean).join(' ')

    const newProfile = {
      id: user.id,
      name: name || '',
      email: email || '',
      avatar: user.imageUrl || '/assets/avatars/avatar1.png',
      level: 1,
      points: 0,
      badges: [],
      completedScenarios: [],
      teamId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await User.insertOne(newProfile)
    return newProfile
  }

  return profile
}

// Function to update user data in MongoDB
export async function updateUser(userId: string, points: number, completedScenarios: string[], badge?: string) {
  const client = await clientPromise
  const db = client.db('cyber_training')
  const usersCollection = db.collection<User>('user')

  try {
    // Find the user by their ID
    const user = await usersCollection.findOne({ id: userId })
    if (!user) {
      throw new Error('User not found')
    }

    // Update the user's data
    const result = await usersCollection.findOneAndUpdate(
      { id: userId },
      {
        $inc: { points }, // Increment points
        $push: { completedScenarios: { $each: completedScenarios } }, // Add new completed scenarios
        $addToSet: badge ? { badges: badge } : {}, // Add badge if provided, avoid duplicates
        $set: { updatedAt: new Date() }, // Update the "updatedAt" field
      },
      { returnDocument: 'after' } // Return the updated document
    )

    // Check if result is null before accessing
    if (!result) {
      throw new Error('Update operation did not return a document')
    }

    // Return the updated user document
    return result
  } catch (error) {
    console.error('Error updating user:', error)
    throw new Error('Failed to update user')
  } finally {
    // Don't close the client here as it might be reused
    // If you need to close it, consider doing it at a higher level
  }
}

export async function getAllUsers() {
  try {
    const client = await clientPromise
    const db = client.db('cyber_training')
    const usersCollection = db.collection<User>('user')

    // Fetch all users from the "user" collection
    const users = await usersCollection.find({}).toArray()

    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('Failed to fetch users')
  }
}
