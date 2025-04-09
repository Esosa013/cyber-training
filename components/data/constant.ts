// src/data/constants.ts

// User Types
export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    password: string;
    level: number;
    points: number;
    badges: string[];
    completedScenarios: string[];
    teamId: string;
  }
  
  // Team Type
  export interface Team {
    id: string;
    name: string;
    members: string[];
    totalPoints: number;
  }
  
  // Scenario Types
  export interface ScenarioOption {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }
  
  export interface ScenarioStep {
    id: string;
    title: string;
    description: string;
    image?: string;
    options: ScenarioOption[];
  }
  
  export interface Scenario {
    id: string;
    title: string;
    description: string;
    category: 'phishing' | 'social' | 'data-protection' | 'network-security' | 'device-security' | 'physical-security' | 'remote-security' | 'application-security' | 'third-party-risk' | 'incident-response';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    points: number;
    estimatedTime: number; // in minutes
    steps: ScenarioStep[];
    badge?: string;
    completed?: boolean; // Optional property to indicate if the scenario is completed
  }
  
  // Badge Type
  export interface Badge {
    id: string;
    name: string;
    description: string;
    image: string;
    requiredPoints: number;
  }
  
  
  export const MOCK_TEAMS: Team[] = [
    {
      id: 'team1',
      name: 'IT Department',
      members: ['user1', 'user2'],
      totalPoints: 1170
    },
    {
      id: 'team2',
      name: 'Marketing',
      members: ['user3'],
      totalPoints: 980
    }
  ];
  
  export const MOCK_SCENARIOS: Scenario[] = [
    {
      id: 'scenario1',
      title: 'The Suspicious Email',
      description: 'Learn to identify and respond to phishing emails by analyzing a suspicious message from a "vendor".',
      category: 'phishing',
      difficulty: 'beginner',
      points: 100,
      estimatedTime: 10,
      badge: 'phishing-novice',
      steps: [
        {
          id: 'step1',
          title: 'Incoming Email',
          description: 'You receive the following email from "Amazon Services". What do you notice?',
          image: '/assets/scenarios/phishing-email.png',
          options: [
            {
              id: 'option1',
              text: 'Reply with the requested account information',
              isCorrect: false,
              explanation: 'Never share account information via email. Legitimate companies never ask for sensitive information this way.'
            },
            {
              id: 'option2',
              text: 'Check the senders email address for inconsistencies',
              isCorrect: true,
              explanation: 'Good catch! The email address "amazon-services@amaz0n-support.net" is suspicious. Amazon would use an official amazon.com domain.'
            },
            {
              id: 'option3',
              text: 'Click the link to verify your account',
              isCorrect: false,
              explanation: 'Clicking unknown links can lead to malware installation or phishing sites that steal your credentials.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Examining the Link',
          description: 'You decide to inspect the link without clicking it. Hovering over it shows: "http://amaz0n-account-verify.com/login". Whats your next action?',
          options: [
            {
              id: 'option1',
              text: 'Copy and paste the link into your browser to check it',
              isCorrect: false,
              explanation: 'Even copying and pasting suspicious links can be dangerous.'
            },
            {
              id: 'option2',
              text: 'Report the email as phishing to your IT department',
              isCorrect: true,
              explanation: 'Excellent! Reporting suspicious emails helps protect your entire organization and allows the security team to block similar threats.'
            },
            {
              id: 'option3',
              text: 'Delete the email and ignore it',
              isCorrect: false,
              explanation: 'While deleting is better than interacting with the email, reporting it to IT is the best practice to help protect others.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario2',
      title: 'The Office Visitor',
      description: 'Practice handling an unexpected visitor whos trying to gain access to your office.',
      category: 'social',
      difficulty: 'intermediate',
      points: 150,
      estimatedTime: 15,
      badge: 'physical-security-expert',
      steps: [
        {
          id: 'step1',
          title: 'Unexpected Visit',
          description: 'A person in professional attire approaches the secure entrance to your office. They smile and say, "Hi, I\'m here to service the printers. Can you let me in? I forgot my badge." What do you do?',
          options: [
            {
              id: 'option1',
              text: 'Let them in since they\'re dressed professionally and mentioned a valid reason',
              isCorrect: false,
              explanation: 'Professional appearance and a plausible story are common tactics used in social engineering attacks.'
            },
            {
              id: 'option2',
              text: 'Ask for their ID and verify with facilities management before allowing entry',
              isCorrect: true,
              explanation: 'Excellent! Always verify unknown visitors with the appropriate department, regardless of how legitimate they seem.'
            },
            {
              id: 'option3',
              text: 'Tell them to wait outside while you go check with your manager',
              isCorrect: false,
              explanation: 'While better than letting them in, leaving a stranger unattended at the entrance isn\'t ideal. It\'s better to contact security or facilities while remaining present.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario3',
      title: 'Password Protection Challenge',
      description: 'Test your knowledge of password security and learn to create strong, memorable passwords.',
      category: 'data-protection',
      difficulty: 'beginner',
      points: 120,
      estimatedTime: 12,
      badge: 'password-pro',
      steps: [
        {
          id: 'step1',
          title: 'Password Evaluation',
          description: 'Which of the following passwords is most secure?',
          options: [
            {
              id: 'option1',
              text: 'Company123',
              isCorrect: false,
              explanation: 'This password is too predictable, using the company name and sequential numbers.'
            },
            {
              id: 'option2',
              text: 'P@ssw0rd!',
              isCorrect: false,
              explanation: 'Despite having special characters, this is a common password pattern and would be easily cracked.'
            },
            {
              id: 'option3',
              text: 'gR8%bL*e!7pHr@se',
              isCorrect: true,
              explanation: 'This password is strong as it\'s long, contains mixed cases, numbers, and special characters in unpredictable positions.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario4',
      title: 'Public Wi-Fi Dangers',
      description: 'Learn how to safely use public Wi-Fi networks and protect your sensitive information.',
      category: 'network-security',
      difficulty: 'intermediate',
      points: 150,
      estimatedTime: 15,
      badge: 'network-defender',
      steps: [
        {
          id: 'step1',
          title: 'Coffee Shop Connection',
          description: 'You\'re working from a coffee shop and need to check your work email. You see several available Wi-Fi networks. Which should you choose?',
          options: [
            {
              id: 'option1',
              text: '"Free Coffee Shop Wi-Fi"',
              isCorrect: false,
              explanation: 'Be cautious of networks with generic names that don\'t clearly identify the business. These could be rogue access points set up by attackers.'
            },
            {
              id: 'option2',
              text: '"JavaBeans_Guest" (the official network listed on your receipt)',
              isCorrect: true,
              explanation: 'Good choice! Always verify the official network name with staff or official materials from the establishment.'
            },
            {
              id: 'option3',
              text: '"Free_WiFi_Fast" with the strongest signal',
              isCorrect: false,
              explanation: 'Strong signals don\'t indicate legitimate networks. This could be an attacker\'s network designed to intercept your traffic.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Accessing Sensitive Information',
          description: 'You\'ve connected to the coffee shop\'s Wi-Fi. Now you need to access your company\'s financial records. What\'s the safest approach?',
          options: [
            {
              id: 'option1',
              text: 'Connect directly to the company portal using the regular URL',
              isCorrect: false,
              explanation: 'Public Wi-Fi networks can be monitored, potentially exposing your login credentials and sensitive data.'
            },
            {
              id: 'option2',
              text: 'Use your company\'s VPN before accessing any work resources',
              isCorrect: true,
              explanation: 'Excellent! A VPN encrypts your connection, preventing others on the public network from intercepting your data.'
            },
            {
              id: 'option3',
              text: 'Wait until fewer people are in the coffee shop to reduce the risk',
              isCorrect: false,
              explanation: 'The number of people present doesn\'t affect your security on a public network. The risk comes from the unencrypted nature of the connection itself.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario5',
      title: 'Mobile Device Security',
      description: 'Protect sensitive company information on your smartphone and tablet.',
      category: 'device-security',
      difficulty: 'beginner',
      points: 130,
      estimatedTime: 12,
      badge: 'mobile-guardian',
      steps: [
        {
          id: 'step1',
          title: 'App Permissions',
          description: 'You\'ve downloaded a new QR code scanner app for a work conference. It asks for the following permissions. Which should raise a red flag?',
          options: [
            {
              id: 'option1',
              text: 'Access to camera',
              isCorrect: false,
              explanation: 'A QR scanner legitimately needs camera access to function properly.'
            },
            {
              id: 'option2',
              text: 'Access to contacts and text messages',
              isCorrect: true,
              explanation: 'Correct! A QR scanner has no legitimate reason to access your contacts or messages. This indicates the app may be collecting excessive data.'
            },
            {
              id: 'option3',
              text: 'Access to storage for saving QR results',
              isCorrect: false,
              explanation: 'Storage access is reasonable for a QR scanner that needs to save results.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Device Loss Protocol',
          description: 'You realize you\'ve left your company phone in a taxi. What should you do first?',
          options: [
            {
              id: 'option1',
              text: 'Call the taxi company to try to recover the device',
              isCorrect: false,
              explanation: 'While this is important, securing the data on the device should be your first priority.'
            },
            {
              id: 'option2',
              text: 'Change your passwords from another device',
              isCorrect: false,
              explanation: 'Changing passwords is important, but doesn\'t address the immediate security concern of the physical device.'
            },
            {
              id: 'option3',
              text: 'Immediately report the loss to IT security to initiate a remote wipe',
              isCorrect: true,
              explanation: 'Correct! The priority is to prevent unauthorized access to company data by remotely wiping the device.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario6',
      title: 'Clean Desk Policy',
      description: 'Learn the importance of maintaining a clean desk to protect sensitive information.',
      category: 'physical-security',
      difficulty: 'beginner',
      points: 100,
      estimatedTime: 10,
      badge: 'workspace-protector',
      steps: [
        {
          id: 'step1',
          title: 'End of Day Procedure',
          description: 'You\'re leaving the office for the day. Which of these should you NOT leave on your desk overnight?',
          options: [
            {
              id: 'option1',
              text: 'Your company-issued laptop, which requires a password to unlock',
              isCorrect: false,
              explanation: 'While it\'s better to secure laptops in a drawer, most clean desk policies allow locked computers to remain on desks.'
            },
            {
              id: 'option2',
              text: 'Printouts of customer financial information you\'ll need tomorrow',
              isCorrect: true,
              explanation: 'Correct! Sensitive documents should never be left out, regardless of whether you\'ll need them soon. They should be locked away or shredded if no longer needed.'
            },
            {
              id: 'option3',
              text: 'Office supplies like pens and notepads with no sensitive information',
              isCorrect: false,
              explanation: 'Standard office supplies without sensitive information are generally permitted under clean desk policies.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Visitor Management',
          description: 'You have a visitor coming to your desk for a meeting. How should you prepare your workspace?',
          options: [
            {
              id: 'option1',
              text: 'Leave your work visible so they can see what you\'re working on and discuss it',
              isCorrect: false,
              explanation: 'This violates confidentiality and may expose sensitive information to unauthorized individuals.'
            },
            {
              id: 'option2',
              text: 'Clear away or secure all confidential documents and lock your computer screen when you leave to greet them',
              isCorrect: true,
              explanation: 'Excellent! Always secure sensitive information before visitors arrive and lock your screen when stepping away, even briefly.'
            },
            {
              id: 'option3',
              text: 'Ask a colleague to watch your desk while you greet the visitor',
              isCorrect: false,
              explanation: 'While having a colleague present is better than leaving items unattended, it\'s still your responsibility to secure sensitive information properly.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario7',
      title: 'Social Media Security',
      description: 'Understand how social media activity can create security risks for your organization.',
      category: 'social',
      difficulty: 'intermediate',
      points: 150,
      estimatedTime: 15,
      badge: 'social-savvy',
      steps: [
        {
          id: 'step1',
          title: 'Sharing Work Updates',
          description: 'You\'ve just completed a major project and want to share your accomplishment on LinkedIn. Which post would be most appropriate?',
          options: [
            {
              id: 'option1',
              text: '"Excited to finish the new secure payment system for [Client Name]! Here\'s a screenshot of the admin dashboard we created."',
              isCorrect: false,
              explanation: 'This reveals too much information about a specific client and includes a screenshot that might contain sensitive information.'
            },
            {
              id: 'option2',
              text: '"Just wrapped up a major project for a financial client. Proud of our team\'s work developing secure transaction systems!"',
              isCorrect: true,
              explanation: 'Good choice! This acknowledges your accomplishment without revealing specific clients, features, or confidential information.'
            },
            {
              id: 'option3',
              text: '"Can\'t believe how outdated the security protocols were at [Client] before our team stepped in. So glad they\'re finally using 2FA now!"',
              isCorrect: false,
              explanation: 'Never disclose security weaknesses of clients, even if they\'ve been addressed. This could damage their reputation and breach confidentiality.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Connection Requests',
          description: 'You receive a LinkedIn connection request from "Samantha Reynolds," who says she\'s a new hire in your company\'s HR department. Her profile was created recently and has few connections. What should you do?',
          options: [
            {
              id: 'option1',
              text: 'Accept the request immediately to be welcoming to new colleagues',
              isCorrect: false,
              explanation: 'Accepting connection requests without verification can lead to social engineering attacks and information gathering.'
            },
            {
              id: 'option2',
              text: 'Verify her employment through internal channels before connecting',
              isCorrect: true,
              explanation: 'Excellent! Always verify the identity of new connection requests, especially those claiming to be colleagues. Contact HR through official channels or check the company directory.'
            },
            {
              id: 'option3',
              text: 'Message her asking for her employee ID number to confirm her identity',
              isCorrect: false,
              explanation: 'Requesting sensitive information like employee IDs through social media is not a secure verification method and could actually help a scammer gather more information.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario8',
      title: 'Advanced Phishing Defense',
      description: 'Learn to identify sophisticated phishing attempts that bypass traditional security measures.',
      category: 'phishing',
      difficulty: 'advanced',
      points: 200,
      estimatedTime: 20,
      badge: 'phishing-master',
      steps: [
        {
          id: 'step1',
          title: 'Spear Phishing Attack',
          description: 'You receive this email: "Hi [Your Name], I was impressed by your presentation at last week\'s conference. I\'d like to discuss a potential partnership. I\'ve shared a proposal document here: [link to Google Doc]. Looking forward to your thoughts! Best, James Wilson, Innovation Director." What\'s suspicious?',
          options: [
            {
              id: 'option1',
              text: 'Nothing suspicious; this appears to be a legitimate business opportunity',
              isCorrect: false,
              explanation: 'Be cautious! Just because an email contains personal details doesn\'t make it legitimate. Attackers research targets through social media and company websites.'
            },
            {
              id: 'option2',
              text: 'The sender knows details about me, but I don\'t recall meeting a James Wilson at the conference',
              isCorrect: true,
              explanation: 'Good instinct! Spear phishing attacks include personalized details, but if you don\'t recall the person, verify their identity before clicking any links or downloading attachments.'
            },
            {
              id: 'option3',
              text: 'Google Docs links are always suspicious and should never be clicked',
              isCorrect: false,
              explanation: 'While caution with links is good, legitimate business communications often use Google Docs. The issue isn\'t the platform but the unknown sender.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'CEO Fraud',
          description: 'You receive this urgent text message: "This is David Miller [your CEO\'s name]. I\'m in an emergency meeting. Need you to purchase $500 in gift cards for a client urgently. Will reimburse you. Keep this confidential until announced. Text me the card codes when done." How do you respond?',
          options: [
            {
              id: 'option1',
              text: 'Purchase the gift cards immediately since it came from the CEO',
              isCorrect: false,
              explanation: 'Urgent requests involving unusual payments, especially gift cards, are classic signs of CEO fraud, regardless of how the message is formatted.'
            },
            {
              id: 'option2',
              text: 'Text back asking for more details about which client needs the gifts',
              isCorrect: false,
              explanation: 'Engaging with the scammer gives them more opportunity to manipulate you. Unusual financial requests should be verified through official channels, not by responding directly.'
            },
            {
              id: 'option3',
              text: 'Verify the request through official channels, such as calling the CEO\'s office or checking with their executive assistant',
              isCorrect: true,
              explanation: 'Excellent! Always verify unusual requests through established channels, especially those involving financial transactions. Call using the official phone number, not one provided in the suspicious message.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario9',
      title: 'Data Classification Challenge',
      description: 'Learn to properly classify and handle different types of sensitive information.',
      category: 'data-protection',
      difficulty: 'intermediate',
      points: 150,
      estimatedTime: 15,
      badge: 'classification-expert',
      steps: [
        {
          id: 'step1',
          title: 'Document Classification',
          description: 'You\'re preparing to share documents with a contractor. Which of these would typically be classified as "Confidential" and require special handling?',
          options: [
            {
              id: 'option1',
              text: 'The company\'s public press release about quarterly earnings',
              isCorrect: false,
              explanation: 'Press releases are specifically created for public consumption and would be classified as "Public" information.'
            },
            {
              id: 'option2',
              text: 'An internal memo about the office holiday party',
              isCorrect: false,
              explanation: 'While internal, this information is generally classified as "Internal Use Only" rather than "Confidential" as it doesn\'t contain sensitive business information.'
            },
            {
              id: 'option3',
              text: 'Customer payment processing information including partial credit card numbers',
              isCorrect: true,
              explanation: 'Correct! Financial and customer data, especially payment information, should be classified as "Confidential" and requires secure handling, limited access, and proper encryption.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Data Sharing Protocols',
          description: 'You need to share a confidential report with an authorized external auditor. What\'s the most appropriate way to do this?',
          options: [
            {
              id: 'option1',
              text: 'Email the file directly to their personal email address for convenience',
              isCorrect: false,
              explanation: 'Confidential information should never be sent to personal email addresses, and unencrypted email is not secure for confidential data.'
            },
            {
              id: 'option2',
              text: 'Use the company\'s secure file sharing system with access expiration and share with their business email',
              isCorrect: true,
              explanation: 'Excellent! Secure file sharing systems with controlled access, expiration dates, and business email verification are appropriate for confidential information.'
            },
            {
              id: 'option3',
              text: 'Print the report and mail it with "Confidential" written on the envelope',
              isCorrect: false,
              explanation: 'Physical documents are difficult to track, can be lost, and don\'t provide audit trails of access. Digital secure sharing is preferred for most confidential information.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario10',
      title: 'Remote Work Security',
      description: 'Learn best practices for maintaining security while working from home or other remote locations.',
      category: 'remote-security',
      difficulty: 'intermediate',
      points: 150,
      estimatedTime: 15,
      badge: 'remote-warrior',
      steps: [
        {
          id: 'step1',
          title: 'Home Office Setup',
          description: 'You\'re setting up your home office for regular remote work. Which of these practices creates the most significant security risk?',
          options: [
            {
              id: 'option1',
              text: 'Using your company laptop on your home Wi-Fi network',
              isCorrect: false,
              explanation: 'Using company equipment on a password-protected home network is generally acceptable, especially when combined with VPN use.'
            },
            {
              id: 'option2',
              text: 'Sharing your work laptop with family members for occasional web browsing',
              isCorrect: true,
              explanation: 'Correct! Work devices should never be shared with family members or friends. This could lead to accidental data exposure, malware infection, or unauthorized access to company resources.'
            },
            {
              id: 'option3',
              text: 'Taking work calls in a room where family members might overhear non-sensitive discussions',
              isCorrect: false,
              explanation: 'While privacy is important for calls, general non-sensitive discussions overheard by family members present less risk than shared device use.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Video Conference Security',
          description: 'You\'re about to host a video meeting where confidential product plans will be discussed. Which security measure is MOST important?',
          options: [
            {
              id: 'option1',
              text: 'Using a virtual background to hide your home environment',
              isCorrect: false,
              explanation: 'While virtual backgrounds can enhance privacy, they don\'t address the critical security aspects of protecting meeting content.'
            },
            {
              id: 'option2',
              text: 'Enabling waiting room and password protection for the meeting',
              isCorrect: true,
              explanation: 'Excellent! Access controls like waiting rooms and passwords are crucial for preventing unauthorized access to meetings where confidential information will be discussed.'
            },
            {
              id: 'option3',
              text: 'Recording the meeting so absent team members can catch up later',
              isCorrect: false,
              explanation: 'Recording creates additional security considerations about where the recording is stored and who can access it. For highly confidential meetings, recordings increase risk.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario11',
      title: 'Secure Code Practices',
      description: 'Learn basic security principles for developers to build more secure applications.',
      category: 'application-security',
      difficulty: 'advanced',
      points: 200,
      estimatedTime: 25,
      badge: 'secure-coder',
      steps: [
        {
          id: 'step1',
          title: 'Authentication Implementation',
          description: 'You\'re implementing a password system for your application. Which approach is most secure?',
          options: [
            {
              id: 'option1',
              text: 'Store passwords in the database using MD5 hashing for quick authentication',
              isCorrect: false,
              explanation: 'MD5 is a deprecated, weak hashing algorithm that can be easily cracked. Never use it for password storage.'
            },
            {
              id: 'option2',
              text: 'Store passwords using bcrypt with an appropriate cost factor and salt',
              isCorrect: true,
              explanation: 'Correct! Modern password storage should use adaptive hashing algorithms like bcrypt, Argon2, or PBKDF2 with salting to protect against various attack methods.'
            },
            {
              id: 'option3',
              text: 'Encrypt passwords with AES and store the key in a separate database table',
              isCorrect: false,
              explanation: 'Encryption (rather than hashing) is not appropriate for password storage since it\'s reversible. The key being in the same database offers little protection if the database is compromised.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Input Validation',
          description: 'You\'re building a web form that accepts a user\'s comment. Which practice best protects against injection attacks?',
          options: [
            {
              id: 'option1',
              text: 'Use client-side JavaScript validation to ensure proper formatting',
              isCorrect: false,
              explanation: 'Client-side validation can be bypassed and should never be the only form of validation. It\'s for user convenience, not security.'
            },
            {
              id: 'option2',
              text: 'Accept the input and remove any HTML tags before storing in the database',
              isCorrect: false,
              explanation: 'While sanitization is important, simple tag removal can be bypassed and might not protect against all injection types.'
            },
            {
              id: 'option3',
              text: 'Use parameterized queries or prepared statements for database operations and validate/sanitize input server-side',
              isCorrect: true,
              explanation: 'Excellent! Parameterized queries prevent SQL injection by separating code from data. Combined with proper server-side validation and sanitization, this provides robust protection.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario12',
      title: 'Incident Response Fundamentals',
      description: 'Learn the basics of responding to security incidents and breaches.',
      category: 'incident-response',
      difficulty: 'advanced',
      points: 180,
      estimatedTime: 20,
      badge: 'incident-responder',
      steps: [
        {
          id: 'step1',
          title: 'Breach Detection',
          description: 'You notice that a colleague\'s computer is sending an unusual amount of network traffic to an unknown external IP address. What should be your FIRST action?',
          options: [
            {
              id: 'option1',
              text: 'Immediately disconnect the computer from the network to contain the threat',
              isCorrect: false,
              explanation: 'While disconnection may be necessary, acting without proper protocol can alert attackers and lose valuable forensic information.'
            },
            {
              id: 'option2',
              text: 'Notify the security team through proper channels according to the incident response plan',
              isCorrect: true,
              explanation: 'Correct! Follow established incident response procedures. The security team needs to coordinate the response, preserve evidence, and determine the appropriate containment strategy.'
            },
            {
              id: 'option3',
              text: 'Ask your colleague what they\'ve been doing on their computer',
              isCorrect: false,
              explanation: 'Direct questioning could compromise the investigation and potentially alert an attacker if the system is compromised.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Containment Strategy',
          description: 'The security team has confirmed a malware infection on several systems. They ask for your assistance with containment. Which approach is most appropriate?',
          options: [
            {
              id: 'option1',
              text: 'Immediately shut down all systems on the network to prevent further spread',
              isCorrect: false,
              explanation: 'A complete shutdown is rarely appropriate and can disrupt business operations unnecessarily while potentially causing data loss.'
            },
            {
              id: 'option2',
              text: 'Run an antivirus scan on the infected systems while they remain on the network',
              isCorrect: false,
              explanation: 'Running antivirus without proper isolation could allow the malware to continue spreading or communicating with command servers.'
            },
            {
              id: 'option3',
              text: 'Isolate affected systems by disconnecting them from the network, then follow the security team\'s established containment procedures',
              isCorrect: true,
              explanation: 'Excellent! Isolation is the first step in containment, followed by systematic response according to the incident response plan. This prevents further spread while allowing for proper investigation.'
            }
          ]
        }
      ]
    },
    {
      id: 'scenario13',
      title: 'Supply Chain Security',
      description: 'Learn to identify and mitigate risks associated with third-party vendors and software.',
      category: 'third-party-risk',
      difficulty: 'advanced',
      points: 180,
      estimatedTime: 18,
      badge: 'supply-chain-guardian',
      steps: [
        {
          id: 'step1',
          title: 'Software Evaluation',
          description: 'Your department wants to purchase new software that will process sensitive customer data. Which security consideration is MOST important during the evaluation?',
          options: [
            {
              id: 'option1',
              text: 'The vendor\'s price and willingness to negotiate favorable terms',
              isCorrect: false,
              explanation: 'While cost is important for business decisions, it should not be the primary factor when evaluating software that will handle sensitive data.'
            },
            {
              id: 'option2',
              text: 'Conducting a thorough security assessment including vendor questionnaires, compliance certifications, and penetration test results',
              isCorrect: true,
              explanation: 'Correct! Before implementing any software that processes sensitive data, a comprehensive security assessment is essential to understand the risks and the vendor\'s security posture.'
            },
            {
              id: 'option3',
              text: 'The software\'s user interface and ease of use for your team',
              isCorrect: false,
              explanation: 'Usability is important but should not supersede security considerations for applications handling sensitive data.'
            }
          ]
        },
        {
          id: 'step2',
          title: 'Vendor Access Management',
          description: 'A vendor needs temporary access to your systems for maintenance. Which approach provides appropriate security?',
          options: [
            {
              id: 'option1',
              text: 'Give them credentials to your admin account for convenience',
              isCorrect: false,
              explanation: 'Never share credentials, especially administrative ones. This violates the principle of accountability and creates unnecessary risk.'
            },
            {
              id: 'option2',
              text: 'Create a generic vendor account that all vendors can use',
              isCorrect: false,
              explanation: 'Generic accounts prevent accountability and make it impossible to track which vendor performed which actions.'
            },
            {
              id: 'option3',
              text: 'Create time-limited accounts with only the specific permissions needed for the maintenance task',
              isCorrect: true,
              explanation: 'Excellent! Following the principle of least privilege by providing time-limited access with only necessary permissions is the most secure approach for vendor access.'
            }
          ]
        }
      ]
    }
  ];
  
  export const MOCK_BADGES: Badge[] = [
    {
      id: 'phishing-novice',
      name: 'Phishing Novice',
      description: 'Successfully completed basic phishing identification training',
      image: '/assets/badges/phishing-novice.png',
      requiredPoints: 100
    },
    {
      id: 'phishing-expert',
      name: 'Phishing Expert',
      description: 'Mastered advanced phishing techniques and defenses',
      image: '/assets/badges/phishing-expert.png',
      requiredPoints: 500
    },
    {
      id: 'password-pro',
      name: 'Password Pro',
      description: 'Demonstrated expertise in password security',
      image: '/assets/badges/password-pro.png',
      requiredPoints: 300
    },
    {
      id: 'security-champion',
      name: 'Security Champion',
      description: 'Achieved excellence across all security domains',
      image: '/assets/badges/security-champion.png',
      requiredPoints: 1000
    },
    {
      id: 'data-guardian',
      name: 'Data Guardian',
      description: 'Expert in data protection practices',
      image: '/assets/badges/data-guardian.png',
      requiredPoints: 800
    },
    {
      id: 'quick-learner',
      name: 'Quick Learner',
      description: 'Completed 5 scenarios in record time',
      image: '/assets/badges/quick-learner.png',
      requiredPoints: 250
    }
  ];
  
  // Mock active user (simulating logged-in user)
  export const ACTIVE_USER_ID = 'user1';