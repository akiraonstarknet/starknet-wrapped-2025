// Personality types and their crypto resolution items
// Each category has 20-30 items ranging from crazy/illegal to actionable

export type PersonalityType = 
  | 'Developer'
  | 'DeFi User'
  | 'Content Writer'
  | 'Marketer'
  | 'Founder'
  | 'Farmer'
  | 'Other User';

export type Chain = 
  | 'Starknet'
  | 'Ethereum'
  | 'Bitcoin'
  | 'Base'
  | 'Solana';

export interface ResolutionItem {
  id: string;
  text: string;
  icon: string; // lucide-react icon name or emoji
  category: PersonalityType;
  intensity: 'crazy' | 'wild' | 'moderate' | 'actionable'; // intensity level
  chain?: Chain; // Optional chain-specific item
}

// Developer resolutions
const developerItems: ResolutionItem[] = [
  { id: 'dev-1', text: 'Build a smart contract that rug pulls itself', category: 'Developer', intensity: 'crazy', icon: '💣' },
  { id: 'dev-2', text: 'Deploy a memecoin with 0% tax and 100% vibes', category: 'Developer', intensity: 'wild', icon: '🚀' },
  { id: 'dev-3', text: 'Create a dApp that pays users to do nothing', category: 'Developer', intensity: 'wild', icon: '💸' },
  { id: 'dev-4', text: 'Build a MEV bot that front-runs your own trades', category: 'Developer', intensity: 'crazy', icon: '🤖' },
  { id: 'dev-5', text: 'Launch a token with infinite supply', category: 'Developer', intensity: 'crazy', icon: '🎰' },
  { id: 'dev-6', text: 'Create a yield farm with 1,000,000% APY', category: 'Developer', intensity: 'wild', icon: '📈' },
  { id: 'dev-7', text: 'Build a bridge that loses funds on purpose', category: 'Developer', intensity: 'crazy', icon: '🌉' },
  { id: 'dev-8', text: 'Deploy a contract with no admin controls', category: 'Developer', intensity: 'wild', icon: '🔓' },
  { id: 'dev-9', text: 'Create a DAO that votes on nothing', category: 'Developer', intensity: 'moderate', icon: '🗳️' },
  { id: 'dev-10', text: 'Build a flash loan arbitrage bot', category: 'Developer', intensity: 'moderate', icon: '⚡' },
  { id: 'dev-11', text: 'Launch your own L2 with 0 validators', category: 'Developer', intensity: 'wild', icon: '🌐' },
  { id: 'dev-12', text: 'Create a token with negative supply', category: 'Developer', intensity: 'crazy', icon: '📉' },
  { id: 'dev-13', text: 'Build a DEX with 100% slippage', category: 'Developer', intensity: 'wild', icon: '💱' },
  { id: 'dev-14', text: 'Deploy a contract that pays gas to users', category: 'Developer', intensity: 'moderate', icon: '⛽' },
  { id: 'dev-15', text: 'Create a governance token with 1 holder', category: 'Developer', intensity: 'moderate', icon: '👑' },
  { id: 'dev-16', text: 'Build your first smart contract', category: 'Developer', intensity: 'actionable', icon: '📝' },
  { id: 'dev-17', text: 'Contribute to an open-source DeFi protocol', category: 'Developer', intensity: 'actionable', icon: '🌱' },
  { id: 'dev-18', text: 'Complete a Solidity/Ethereum course', category: 'Developer', intensity: 'actionable', icon: '🎓' },
  { id: 'dev-19', text: 'Deploy a testnet contract', category: 'Developer', intensity: 'actionable', icon: '🧪' },
  { id: 'dev-20', text: 'Build a simple DApp frontend', category: 'Developer', intensity: 'actionable', icon: '💻' },
  { id: 'dev-21', text: 'Write a technical blog post about crypto', category: 'Developer', intensity: 'actionable', icon: '✍️' },
  { id: 'dev-22', text: 'Participate in a hackathon', category: 'Developer', intensity: 'actionable', icon: '🏆' },
  { id: 'dev-23', text: 'Audit a smart contract (or learn how)', category: 'Developer', intensity: 'actionable', icon: '🔍' },
  { id: 'dev-24', text: 'Create a Web3 portfolio project', category: 'Developer', intensity: 'actionable', icon: '📊' },
  { id: 'dev-25', text: 'Join a developer DAO', category: 'Developer', intensity: 'actionable', icon: '👥' },
  { id: 'dev-26', text: 'Learn a new blockchain (Solana, Cosmos, etc)', category: 'Developer', intensity: 'actionable', icon: '🔗' },
  { id: 'dev-27', text: 'Build a token vesting contract', category: 'Developer', intensity: 'actionable', icon: '⏰' },
  { id: 'dev-28', text: 'Create a multi-sig wallet', category: 'Developer', intensity: 'actionable', icon: '🔐' },
];

// DeFi User resolutions
const defiUserItems: ResolutionItem[] = [
  { id: 'defi-1', text: 'Leverage trade your entire net worth 100x', category: 'DeFi User', intensity: 'crazy', icon: '📈' },
  { id: 'defi-2', text: 'Provide liquidity to a token with 0 holders', category: 'DeFi User', intensity: 'wild', icon: '💧' },
  { id: 'defi-3', text: 'Yield farm a token that drops 99% daily', category: 'DeFi User', intensity: 'wild', icon: '🚜' },
  { id: 'defi-4', text: 'Borrow against your house to buy memecoins', category: 'DeFi User', intensity: 'crazy', icon: '🏠' },
  { id: 'defi-5', text: 'Stake everything in a protocol with no audits', category: 'DeFi User', intensity: 'crazy', icon: '🎲' },
  { id: 'defi-6', text: 'Ape into a presale with 0% vesting', category: 'DeFi User', intensity: 'wild', icon: '🦍' },
  { id: 'defi-7', text: 'Use a bridge that was hacked last week', category: 'DeFi User', intensity: 'crazy', icon: '🌉' },
  { id: 'defi-8', text: 'Liquidity mine a token with infinite mint', category: 'DeFi User', intensity: 'wild', icon: '⛏️' },
  { id: 'defi-9', text: 'Borrow stablecoins to buy more crypto', category: 'DeFi User', intensity: 'moderate', icon: '💵' },
  { id: 'defi-10', text: 'Farm yield on 10 different protocols at once', category: 'DeFi User', intensity: 'moderate', icon: '🌾' },
  { id: 'defi-11', text: 'Provide liquidity to a new DEX launch', category: 'DeFi User', intensity: 'moderate', icon: '💱' },
  { id: 'defi-12', text: 'Stake in a validator with 0% commission', category: 'DeFi User', intensity: 'moderate', icon: '🛡️' },
  { id: 'defi-13', text: 'Use a flash loan to flip an NFT', category: 'DeFi User', intensity: 'moderate', icon: '⚡' },
  { id: 'defi-14', text: 'Diversify across 50+ DeFi protocols', category: 'DeFi User', intensity: 'moderate', icon: '📊' },
  { id: 'defi-15', text: 'Try a new L2 for the first time', category: 'DeFi User', intensity: 'actionable', icon: '🔗' },
  { id: 'defi-16', text: 'Provide liquidity to a major DEX pair', category: 'DeFi User', intensity: 'actionable', icon: '💧' },
  { id: 'defi-17', text: 'Stake your tokens for passive income', category: 'DeFi User', intensity: 'actionable', icon: '💰' },
  { id: 'defi-18', text: 'Use a lending protocol to earn interest', category: 'DeFi User', intensity: 'actionable', icon: '🏦' },
  { id: 'defi-19', text: 'Participate in a governance proposal', category: 'DeFi User', intensity: 'actionable', icon: '🗳️' },
  { id: 'defi-20', text: 'Try yield farming with proper research', category: 'DeFi User', intensity: 'actionable', icon: '🌾' },
  { id: 'defi-21', text: 'Use a DEX aggregator for better rates', category: 'DeFi User', intensity: 'actionable', icon: '🔍' },
  { id: 'defi-22', text: 'Set up a recurring DCA strategy', category: 'DeFi User', intensity: 'actionable', icon: '📅' },
  { id: 'defi-23', text: 'Learn about impermanent loss', category: 'DeFi User', intensity: 'actionable', icon: '📚' },
  { id: 'defi-24', text: 'Diversify your DeFi portfolio', category: 'DeFi User', intensity: 'actionable', icon: '🎯' },
  { id: 'defi-25', text: 'Track your DeFi yields in a spreadsheet', category: 'DeFi User', intensity: 'actionable', icon: '📊' },
  { id: 'defi-26', text: 'Join a DeFi community/DAO', category: 'DeFi User', intensity: 'actionable', icon: '👥' },
  { id: 'defi-27', text: 'Try a new DeFi protocol (after DYOR)', category: 'DeFi User', intensity: 'actionable', icon: '🆕' },
  { id: 'defi-28', text: 'Use a hardware wallet for large positions', category: 'DeFi User', intensity: 'actionable', icon: '🔐' },
];

// Content Writer resolutions
const contentWriterItems: ResolutionItem[] = [
  { id: 'content-1', text: 'Write a thread shilling a token you own', category: 'Content Writer', intensity: 'wild', icon: '📢' },
  { id: 'content-2', text: 'Create 100 AI-generated articles in one day', category: 'Content Writer', intensity: 'wild', icon: '🤖' },
  { id: 'content-3', text: 'Pump a project you got paid to shill', category: 'Content Writer', intensity: 'crazy', icon: '💸' },
  { id: 'content-4', text: 'Write a thread with 0 research and 100% vibes', category: 'Content Writer', intensity: 'wild', icon: '🎲' },
  { id: 'content-5', text: 'Copy-paste someone else\'s alpha as your own', category: 'Content Writer', intensity: 'crazy', icon: '📋' },
  { id: 'content-6', text: 'Create clickbait titles for every post', category: 'Content Writer', intensity: 'moderate', icon: '🎣' },
  { id: 'content-7', text: 'Write about a protocol without using it', category: 'Content Writer', intensity: 'moderate', icon: '✍️' },
  { id: 'content-8', text: 'Post 50 threads in one day for engagement', category: 'Content Writer', intensity: 'wild', icon: '📱' },
  { id: 'content-9', text: 'Create a newsletter with 0 subscribers', category: 'Content Writer', intensity: 'moderate', icon: '📧' },
  { id: 'content-10', text: 'Write a thread that goes viral (or try)', category: 'Content Writer', intensity: 'moderate', icon: '🔥' },
  { id: 'content-11', text: 'Create educational content about DeFi', category: 'Content Writer', intensity: 'actionable', icon: '📚' },
  { id: 'content-12', text: 'Write a technical deep-dive on a protocol', category: 'Content Writer', intensity: 'actionable', icon: '🔬' },
  { id: 'content-13', text: 'Start a crypto newsletter', category: 'Content Writer', intensity: 'actionable', icon: '📰' },
  { id: 'content-14', text: 'Create a YouTube channel about crypto', category: 'Content Writer', intensity: 'actionable', icon: '🎥' },
  { id: 'content-15', text: 'Write a Medium article about your journey', category: 'Content Writer', intensity: 'actionable', icon: '✍️' },
  { id: 'content-16', text: 'Create a Twitter thread series', category: 'Content Writer', intensity: 'actionable', icon: '🧵' },
  { id: 'content-17', text: 'Start a podcast about Web3', category: 'Content Writer', intensity: 'actionable', icon: '🎙️' },
  { id: 'content-18', text: 'Write documentation for a DeFi protocol', category: 'Content Writer', intensity: 'actionable', icon: '📖' },
  { id: 'content-19', text: 'Create infographics about crypto concepts', category: 'Content Writer', intensity: 'actionable', icon: '📊' },
  { id: 'content-20', text: 'Interview a crypto founder', category: 'Content Writer', intensity: 'actionable', icon: '🎤' },
  { id: 'content-21', text: 'Write a case study on a DeFi hack', category: 'Content Writer', intensity: 'actionable', icon: '🔍' },
  { id: 'content-22', text: 'Create a beginner\'s guide to crypto', category: 'Content Writer', intensity: 'actionable', icon: '🌱' },
  { id: 'content-23', text: 'Start a Substack about blockchain', category: 'Content Writer', intensity: 'actionable', icon: '📝' },
  { id: 'content-24', text: 'Write a weekly market analysis', category: 'Content Writer', intensity: 'actionable', icon: '📈' },
  { id: 'content-25', text: 'Create content in a new language', category: 'Content Writer', intensity: 'actionable', icon: '🌍' },
  { id: 'content-26', text: 'Collaborate with other crypto writers', category: 'Content Writer', intensity: 'actionable', icon: '🤝' },
  { id: 'content-27', text: 'Build a personal brand in crypto Twitter', category: 'Content Writer', intensity: 'actionable', icon: '👤' },
  { id: 'content-28', text: 'Write about your crypto mistakes (transparency)', category: 'Content Writer', intensity: 'actionable', icon: '💭' },
];

// Marketer resolutions
const marketerItems: ResolutionItem[] = [
  { id: 'marketer-1', text: 'Run a campaign for a token that rugs', category: 'Marketer', intensity: 'crazy', icon: '💣' },
  { id: 'marketer-2', text: 'Shill a project without reading the whitepaper', category: 'Marketer', intensity: 'wild', icon: '📢' },
  { id: 'marketer-3', text: 'Create 100 fake accounts to shill', category: 'Marketer', intensity: 'crazy', icon: '🤖' },
  { id: 'marketer-4', text: 'Pay influencers to shill without disclosure', category: 'Marketer', intensity: 'crazy', icon: '💰' },
  { id: 'marketer-5', text: 'Launch a token with 0 marketing budget', category: 'Marketer', intensity: 'wild', icon: '🚀' },
  { id: 'marketer-6', text: 'Create a campaign that promises 1000x returns', category: 'Marketer', intensity: 'wild', icon: '📈' },
  { id: 'marketer-7', text: 'Spam every crypto group with your project', category: 'Marketer', intensity: 'wild', icon: '📱' },
  { id: 'marketer-8', text: 'Run ads without any compliance checks', category: 'Marketer', intensity: 'crazy', icon: '⚠️' },
  { id: 'marketer-9', text: 'Create a viral meme campaign', category: 'Marketer', intensity: 'moderate', icon: '🎭' },
  { id: 'marketer-10', text: 'Launch a token with influencer partnerships', category: 'Marketer', intensity: 'moderate', icon: '🤝' },
  { id: 'marketer-11', text: 'Run a community growth campaign', category: 'Marketer', intensity: 'actionable', icon: '👥' },
  { id: 'marketer-12', text: 'Create a brand identity for a crypto project', category: 'Marketer', intensity: 'actionable', icon: '🎨' },
  { id: 'marketer-13', text: 'Launch a referral program', category: 'Marketer', intensity: 'actionable', icon: '🎁' },
  { id: 'marketer-14', text: 'Build a community on Discord/Telegram', category: 'Marketer', intensity: 'actionable', icon: '💬' },
  { id: 'marketer-15', text: 'Create a content marketing strategy', category: 'Marketer', intensity: 'actionable', icon: '📝' },
  { id: 'marketer-16', text: 'Run a Twitter Spaces campaign', category: 'Marketer', intensity: 'actionable', icon: '🎙️' },
  { id: 'marketer-17', text: 'Launch an airdrop campaign', category: 'Marketer', intensity: 'actionable', icon: '🎁' },
  { id: 'marketer-18', text: 'Create partnerships with other projects', category: 'Marketer', intensity: 'actionable', icon: '🤝' },
  { id: 'marketer-19', text: 'Build an email marketing list', category: 'Marketer', intensity: 'actionable', icon: '📧' },
  { id: 'marketer-20', text: 'Create a launch strategy for a token', category: 'Marketer', intensity: 'actionable', icon: '🚀' },
  { id: 'marketer-21', text: 'Run a community contest/giveaway', category: 'Marketer', intensity: 'actionable', icon: '🎉' },
  { id: 'marketer-22', text: 'Build relationships with crypto media', category: 'Marketer', intensity: 'actionable', icon: '📰' },
  { id: 'marketer-23', text: 'Create a social media content calendar', category: 'Marketer', intensity: 'actionable', icon: '📅' },
  { id: 'marketer-24', text: 'Launch a PR campaign', category: 'Marketer', intensity: 'actionable', icon: '📢' },
  { id: 'marketer-25', text: 'Build a landing page for a project', category: 'Marketer', intensity: 'actionable', icon: '🌐' },
  { id: 'marketer-26', text: 'Create a video marketing campaign', category: 'Marketer', intensity: 'actionable', icon: '🎥' },
  { id: 'marketer-27', text: 'Run analytics on marketing campaigns', category: 'Marketer', intensity: 'actionable', icon: '📊' },
  { id: 'marketer-28', text: 'Build a community ambassador program', category: 'Marketer', intensity: 'actionable', icon: '⭐' },
];

// Founder resolutions
const founderItems: ResolutionItem[] = [
  { id: 'founder-1', text: 'Launch a token and rug pull in 24 hours', category: 'Founder', intensity: 'crazy', icon: '💣' },
  { id: 'founder-2', text: 'Create a DAO with yourself as the only member', category: 'Founder', intensity: 'wild', icon: '👑' },
  { id: 'founder-3', text: 'Raise funds for a project that doesn\'t exist', category: 'Founder', intensity: 'crazy', icon: '💰' },
  { id: 'founder-4', text: 'Launch an L2 with 0 infrastructure', category: 'Founder', intensity: 'crazy', icon: '🌐' },
  { id: 'founder-5', text: 'Create a protocol with no tokenomics', category: 'Founder', intensity: 'wild', icon: '🎲' },
  { id: 'founder-6', text: 'Launch a DEX with 0 liquidity', category: 'Founder', intensity: 'wild', icon: '💱' },
  { id: 'founder-7', text: 'Build a project and never ship', category: 'Founder', intensity: 'wild', icon: '🚢' },
  { id: 'founder-8', text: 'Create a token with 100% team allocation', category: 'Founder', intensity: 'crazy', icon: '👥' },
  { id: 'founder-9', text: 'Launch a project with 0 marketing', category: 'Founder', intensity: 'moderate', icon: '📢' },
  { id: 'founder-10', text: 'Build a protocol and keep all the keys', category: 'Founder', intensity: 'wild', icon: '🔑' },
  { id: 'founder-11', text: 'Launch your first crypto project', category: 'Founder', intensity: 'actionable', icon: '🚀' },
  { id: 'founder-12', text: 'Raise a seed round for your startup', category: 'Founder', intensity: 'actionable', icon: '💵' },
  { id: 'founder-13', text: 'Build a team for your project', category: 'Founder', intensity: 'actionable', icon: '👥' },
  { id: 'founder-14', text: 'Launch a token with proper tokenomics', category: 'Founder', intensity: 'actionable', icon: '📊' },
  { id: 'founder-15', text: 'Get your project audited', category: 'Founder', intensity: 'actionable', icon: '🔍' },
  { id: 'founder-16', text: 'Build a community around your project', category: 'Founder', intensity: 'actionable', icon: '👥' },
  { id: 'founder-17', text: 'Launch on a major DEX', category: 'Founder', intensity: 'actionable', icon: '💱' },
  { id: 'founder-18', text: 'Create a whitepaper for your project', category: 'Founder', intensity: 'actionable', icon: '📄' },
  { id: 'founder-19', text: 'Build partnerships with other projects', category: 'Founder', intensity: 'actionable', icon: '🤝' },
  { id: 'founder-20', text: 'Launch a governance token', category: 'Founder', intensity: 'actionable', icon: '🗳️' },
  { id: 'founder-21', text: 'Get listed on CoinGecko / CoinMarketCap', category: 'Founder', intensity: 'actionable', icon: '📈' },
  { id: 'founder-22', text: 'Build a working MVP', category: 'Founder', intensity: 'actionable', icon: '🛠️' },
  { id: 'founder-23', text: 'Create a roadmap for your project', category: 'Founder', intensity: 'actionable', icon: '🗺️' },
  { id: 'founder-24', text: 'Launch a testnet version', category: 'Founder', intensity: 'actionable', icon: '🧪' },
  { id: 'founder-25', text: 'Build a dApp with real users', category: 'Founder', intensity: 'actionable', icon: '📱' },
  { id: 'founder-26', text: 'Create a sustainable business model', category: 'Founder', intensity: 'actionable', icon: '💼' },
  { id: 'founder-27', text: 'Get featured in crypto media', category: 'Founder', intensity: 'actionable', icon: '📰' },
  { id: 'founder-28', text: 'Build a long-term vision for your project', category: 'Founder', intensity: 'actionable', icon: '🔮' },
];

// Farmer resolutions
const farmerItems: ResolutionItem[] = [
  { id: 'farmer-1', text: 'Ape into every presale without research', category: 'Farmer', intensity: 'crazy', icon: '🦍' },
  { id: 'farmer-2', text: 'Farm yield on a token that drops 99%', category: 'Farmer', intensity: 'wild', icon: '🚜' },
  { id: 'farmer-3', text: 'Provide liquidity to a honeypot token', category: 'Farmer', intensity: 'crazy', icon: '🍯' },
  { id: 'farmer-4', text: 'Yield farm with your life savings', category: 'Farmer', intensity: 'crazy', icon: '💰' },
  { id: 'farmer-5', text: 'Ape into a token with 0 liquidity', category: 'Farmer', intensity: 'wild', icon: '💧' },
  { id: 'farmer-6', text: 'Farm a token that rugs mid-farm', category: 'Farmer', intensity: 'wild', icon: '💣' },
  { id: 'farmer-7', text: 'Provide liquidity without understanding IL', category: 'Farmer', intensity: 'moderate', icon: '📉' },
  { id: 'farmer-8', text: 'Farm yield on 50 protocols simultaneously', category: 'Farmer', intensity: 'wild', icon: '🌾' },
  { id: 'farmer-9', text: 'Ape into a memecoin at ATH', category: 'Farmer', intensity: 'moderate', icon: '📈' },
  { id: 'farmer-10', text: 'Farm a token with infinite emissions', category: 'Farmer', intensity: 'wild', icon: '♾️' },
  { id: 'farmer-11', text: 'Try yield farming for the first time', category: 'Farmer', intensity: 'actionable', icon: '🌾' },
  { id: 'farmer-12', text: 'Provide liquidity to a stablecoin pair', category: 'Farmer', intensity: 'actionable', icon: '💵' },
  { id: 'farmer-13', text: 'Farm yield on a reputable protocol', category: 'Farmer', intensity: 'actionable', icon: '🏦' },
  { id: 'farmer-14', text: 'Learn about impermanent loss', category: 'Farmer', intensity: 'actionable', icon: '📚' },
  { id: 'farmer-15', text: 'Diversify across multiple farms', category: 'Farmer', intensity: 'actionable', icon: '📊' },
  { id: 'farmer-16', text: 'Track your farming yields', category: 'Farmer', intensity: 'actionable', icon: '📈' },
  { id: 'farmer-17', text: 'Compound your farming rewards', category: 'Farmer', intensity: 'actionable', icon: '🔄' },
  { id: 'farmer-18', text: 'Farm on a new L2', category: 'Farmer', intensity: 'actionable', icon: '🔗' },
  { id: 'farmer-19', text: 'Provide liquidity to a major DEX', category: 'Farmer', intensity: 'actionable', icon: '💱' },
  { id: 'farmer-20', text: 'Join a farming community', category: 'Farmer', intensity: 'actionable', icon: '👥' },
  { id: 'farmer-21', text: 'Research before farming a new token', category: 'Farmer', intensity: 'actionable', icon: '🔍' },
  { id: 'farmer-22', text: 'Set up auto-compounding', category: 'Farmer', intensity: 'actionable', icon: '⚙️' },
  { id: 'farmer-23', text: 'Farm yield with proper risk management', category: 'Farmer', intensity: 'actionable', icon: '🛡️' },
  { id: 'farmer-24', text: 'Try a new farming protocol (after DYOR)', category: 'Farmer', intensity: 'actionable', icon: '🆕' },
  { id: 'farmer-25', text: 'Calculate your actual APY after fees', category: 'Farmer', intensity: 'actionable', icon: '🧮' },
  { id: 'farmer-26', text: 'Farm with a portion of your portfolio', category: 'Farmer', intensity: 'actionable', icon: '💼' },
  { id: 'farmer-27', text: 'Learn about different farming strategies', category: 'Farmer', intensity: 'actionable', icon: '📖' },
  { id: 'farmer-28', text: 'Build a farming dashboard', category: 'Farmer', intensity: 'actionable', icon: '📊' },
];

// Other User resolutions
const otherUserItems: ResolutionItem[] = [
  { id: 'other-1', text: 'Buy a token because of a Twitter thread', category: 'Other User', intensity: 'moderate', icon: '🧵' },
  { id: 'other-2', text: 'Send your seed phrase to "support"', category: 'Other User', intensity: 'crazy', icon: '🔑' },
  { id: 'other-3', text: 'Click on every airdrop link you see', category: 'Other User', intensity: 'wild', icon: '🎁' },
  { id: 'other-4', text: 'Buy a token because it has a dog logo', category: 'Other User', intensity: 'moderate', icon: '🐕' },
  { id: 'other-5', text: 'Connect wallet to every site that asks', category: 'Other User', intensity: 'crazy', icon: '🔌' },
  { id: 'other-6', text: 'Ape into a token because of a meme', category: 'Other User', intensity: 'moderate', icon: '🎭' },
  { id: 'other-7', text: 'Buy high and sell low (consistently)', category: 'Other User', intensity: 'moderate', icon: '📉' },
  { id: 'other-8', text: 'Trust a DM from "Elon Musk"', category: 'Other User', intensity: 'crazy', icon: '💬' },
  { id: 'other-9', text: 'Buy a token because it\'s "going to the moon"', category: 'Other User', intensity: 'moderate', icon: '🌙' },
  { id: 'other-10', text: 'Create your first crypto wallet', category: 'Other User', intensity: 'actionable', icon: '👛' },
  { id: 'other-11', text: 'Buy your first cryptocurrency', category: 'Other User', intensity: 'actionable', icon: '💰' },
  { id: 'other-12', text: 'Learn about blockchain basics', category: 'Other User', intensity: 'actionable', icon: '📚' },
  { id: 'other-13', text: 'Join a crypto community', category: 'Other User', intensity: 'actionable', icon: '👥' },
  { id: 'other-14', text: 'Set up two-factor authentication', category: 'Other User', intensity: 'actionable', icon: '🔐' },
  { id: 'other-15', text: 'Learn about DeFi basics', category: 'Other User', intensity: 'actionable', icon: '🏦' },
  { id: 'other-16', text: 'Try using a DEX for the first time', category: 'Other User', intensity: 'actionable', icon: '💱' },
  { id: 'other-17', text: 'Research before investing', category: 'Other User', intensity: 'actionable', icon: '🔍' },
  { id: 'other-18', text: 'Diversify your crypto portfolio', category: 'Other User', intensity: 'actionable', icon: '📊' },
  { id: 'other-19', text: 'Learn about wallet security', category: 'Other User', intensity: 'actionable', icon: '🛡️' },
  { id: 'other-20', text: 'Follow crypto news and updates', category: 'Other User', intensity: 'actionable', icon: '📰' },
  { id: 'other-21', text: 'Try staking for the first time', category: 'Other User', intensity: 'actionable', icon: '💰' },
  { id: 'other-22', text: 'Learn about NFTs', category: 'Other User', intensity: 'actionable', icon: '🖼️' },
  { id: 'other-23', text: 'Join a DAO', category: 'Other User', intensity: 'actionable', icon: '🗳️' },
  { id: 'other-24', text: 'Attend a crypto meetup or event', category: 'Other User', intensity: 'actionable', icon: '🎪' },
  { id: 'other-25', text: 'Create a crypto Twitter account', category: 'Other User', intensity: 'actionable', icon: '🐦' },
  { id: 'other-26', text: 'Learn about different blockchains', category: 'Other User', intensity: 'actionable', icon: '🔗' },
  { id: 'other-27', text: 'Set up a hardware wallet', category: 'Other User', intensity: 'actionable', icon: '💳' },
  { id: 'other-28', text: 'Teach someone else about crypto', category: 'Other User', intensity: 'actionable', icon: '👨‍🏫' },
];

// Chain-specific resolutions
const starknetItems: ResolutionItem[] = [
  { id: 'starknet-1', text: 'Create a Starknet wallet', category: 'Other User', intensity: 'actionable', icon: '👛', chain: 'Starknet' },
  { id: 'starknet-2', text: 'Lend on Vesu', category: 'DeFi User', intensity: 'actionable', icon: '🏦', chain: 'Starknet' },
  { id: 'starknet-3', text: 'Borrow on Vesu', category: 'DeFi User', intensity: 'actionable', icon: '💵', chain: 'Starknet' },
  { id: 'starknet-4', text: 'Stake STRK on Endur.fi', category: 'DeFi User', intensity: 'actionable', icon: '💰', chain: 'Starknet' },
  { id: 'starknet-6', text: 'Deploy a Cairo smart contract', category: 'Developer', intensity: 'actionable', icon: '📝', chain: 'Starknet' },
  { id: 'starknet-7', text: 'Trade on Ekubo', category: 'DeFi User', intensity: 'actionable', icon: '💱', chain: 'Starknet' },
  { id: 'starknet-8', text: 'Bridge to Starknet via StarkGate', category: 'DeFi User', intensity: 'actionable', icon: '🌉', chain: 'Starknet' },
  { id: 'starknet-9', text: 'Mint an NFT on Starknet', category: 'Other User', intensity: 'actionable', icon: '🖼️', chain: 'Starknet' },
  { id: 'starknet-10', text: 'Build a dApp on Starknet', category: 'Developer', intensity: 'actionable', icon: '💻', chain: 'Starknet' },
  { id: 'starknet-12', text: 'Farm yield on Troves.fi', category: 'Farmer', intensity: 'actionable', icon: '🌾', chain: 'Starknet' },
  { id: 'starknet-13', text: 'Ape into a Starknet memecoin', category: 'Other User', intensity: 'wild', icon: '🦍', chain: 'Starknet' },
  { id: 'starknet-14', text: 'Trade PERPs on Extended', category: 'DeFi User', intensity: 'actionable', icon: '💱', chain: 'Starknet' },
  { id: 'starknet-15', text: 'Trade PERPs on Paradex', category: 'DeFi User', intensity: 'actionable', icon: '💱', chain: 'Starknet' },
  { id: 'starknet-16', text: 'Rug pull a meme coin on Starknet (just kidding)', category: 'Developer', intensity: 'crazy', icon: '💣', chain: 'Starknet' },
];

const ethereumItems: ResolutionItem[] = [
  { id: 'ethereum-1', text: 'Create an Ethereum wallet', category: 'Other User', intensity: 'actionable', icon: '👛', chain: 'Ethereum' },
  { id: 'ethereum-2', text: 'Lend on Aave', category: 'DeFi User', intensity: 'actionable', icon: '🏦', chain: 'Ethereum' },
  { id: 'ethereum-3', text: 'Borrow on Aave', category: 'DeFi User', intensity: 'actionable', icon: '💵', chain: 'Ethereum' },
  { id: 'ethereum-4', text: 'Stake ETH on Lido', category: 'DeFi User', intensity: 'actionable', icon: '💰', chain: 'Ethereum' },
  { id: 'ethereum-5', text: 'Liquid stake ETH', category: 'DeFi User', intensity: 'actionable', icon: '💧', chain: 'Ethereum' },
  { id: 'ethereum-6', text: 'Deploy a Solidity smart contract', category: 'Developer', intensity: 'actionable', icon: '📝', chain: 'Ethereum' },
  { id: 'ethereum-7', text: 'Trade on Uniswap', category: 'DeFi User', intensity: 'actionable', icon: '💱', chain: 'Ethereum' },
  { id: 'ethereum-8', text: 'Bridge to Ethereum', category: 'DeFi User', intensity: 'actionable', icon: '🌉', chain: 'Ethereum' },
  { id: 'ethereum-9', text: 'Mint an NFT on Ethereum', category: 'Other User', intensity: 'actionable', icon: '🖼️', chain: 'Ethereum' },
  { id: 'ethereum-10', text: 'Build a dApp on Ethereum', category: 'Developer', intensity: 'actionable', icon: '💻', chain: 'Ethereum' },
  { id: 'ethereum-11', text: 'Use MetaMask for the first time', category: 'Other User', intensity: 'actionable', icon: '🦊', chain: 'Ethereum' },
  { id: 'ethereum-12', text: 'Farm yield on Compound', category: 'Farmer', intensity: 'actionable', icon: '🌾', chain: 'Ethereum' },
  { id: 'ethereum-13', text: 'Ape into an Ethereum memecoin', category: 'Other User', intensity: 'wild', icon: '🦍', chain: 'Ethereum' },
  { id: 'ethereum-14', text: 'Create an ERC-20 token', category: 'Founder', intensity: 'actionable', icon: '🪙', chain: 'Ethereum' },
  { id: 'ethereum-15', text: 'Pay $100+ in gas fees', category: 'DeFi User', intensity: 'wild', icon: '⛽', chain: 'Ethereum' },
];

const bitcoinItems: ResolutionItem[] = [
  { id: 'bitcoin-1', text: 'Create a Bitcoin wallet', category: 'Other User', intensity: 'actionable', icon: '👛', chain: 'Bitcoin' },
  { id: 'bitcoin-2', text: 'Stake BTC on Endur', category: 'DeFi User', intensity: 'actionable', icon: '💰', chain: 'Bitcoin' },
  { id: 'bitcoin-3', text: 'Liquid stake BTC', category: 'DeFi User', intensity: 'actionable', icon: '💧', chain: 'Bitcoin' },
  { id: 'bitcoin-4', text: 'Buy your first Bitcoin', category: 'Other User', intensity: 'actionable', icon: '₿', chain: 'Bitcoin' },
  { id: 'bitcoin-5', text: 'Run a Bitcoin node', category: 'Developer', intensity: 'actionable', icon: '🖥️', chain: 'Bitcoin' },
  { id: 'bitcoin-6', text: 'Mine Bitcoin (or try)', category: 'Developer', intensity: 'wild', icon: '⛏️', chain: 'Bitcoin' },
  { id: 'bitcoin-7', text: 'Use Lightning Network', category: 'DeFi User', intensity: 'actionable', icon: '⚡', chain: 'Bitcoin' },
  { id: 'bitcoin-8', text: 'Bridge BTC to Ethereum', category: 'DeFi User', intensity: 'actionable', icon: '🌉', chain: 'Bitcoin' },
  { id: 'bitcoin-9', text: 'Inscribe an Ordinal', category: 'Other User', intensity: 'wild', icon: '📝', chain: 'Bitcoin' },
  { id: 'bitcoin-10', text: 'Trade Bitcoin on a DEX', category: 'DeFi User', intensity: 'actionable', icon: '💱', chain: 'Bitcoin' },
  { id: 'bitcoin-11', text: 'HODL Bitcoin for 1 year', category: 'Other User', intensity: 'actionable', icon: '💎', chain: 'Bitcoin' },
  { id: 'bitcoin-12', text: 'Use a hardware wallet for BTC', category: 'Other User', intensity: 'actionable', icon: '🔐', chain: 'Bitcoin' },
  { id: 'bitcoin-13', text: 'Ape into a Bitcoin memecoin', category: 'Other User', intensity: 'wild', icon: '🦍', chain: 'Bitcoin' },
  { id: 'bitcoin-14', text: 'Create a Bitcoin L2', category: 'Founder', intensity: 'wild', icon: '🌐', chain: 'Bitcoin' },
  { id: 'bitcoin-15', text: 'Spend 1 BTC on pizza (again)', category: 'Other User', intensity: 'crazy', icon: '🍕', chain: 'Bitcoin' },
];

const baseItems: ResolutionItem[] = [
  { id: 'base-1', text: 'Create a Base wallet', category: 'Other User', intensity: 'actionable', icon: '👛', chain: 'Base' },
  { id: 'base-2', text: 'Lend on Aave Base', category: 'DeFi User', intensity: 'actionable', icon: '🏦', chain: 'Base' },
  { id: 'base-3', text: 'Borrow on Aave Base', category: 'DeFi User', intensity: 'actionable', icon: '💵', chain: 'Base' },
  { id: 'base-4', text: 'Bridge to Base', category: 'DeFi User', intensity: 'actionable', icon: '🌉', chain: 'Base' },
  { id: 'base-5', text: 'Trade on Uniswap Base', category: 'DeFi User', intensity: 'actionable', icon: '💱', chain: 'Base' },
  { id: 'base-6', text: 'Deploy a contract on Base', category: 'Developer', intensity: 'actionable', icon: '📝', chain: 'Base' },
  { id: 'base-7', text: 'Mint an NFT on Base', category: 'Other User', intensity: 'actionable', icon: '🖼️', chain: 'Base' },
  { id: 'base-8', text: 'Farm yield on Base', category: 'Farmer', intensity: 'actionable', icon: '🌾', chain: 'Base' },
  { id: 'base-9', text: 'Build a dApp on Base', category: 'Developer', intensity: 'actionable', icon: '💻', chain: 'Base' },
  { id: 'base-10', text: 'Use Base for the first time', category: 'Other User', intensity: 'actionable', icon: '🆕', chain: 'Base' },
  { id: 'base-11', text: 'Ape into a Base memecoin', category: 'Other User', intensity: 'wild', icon: '🦍', chain: 'Base' },
  { id: 'base-12', text: 'Create a Base L3', category: 'Founder', intensity: 'wild', icon: '🌐', chain: 'Base' },
  { id: 'base-13', text: 'Get Base airdrop (if eligible)', category: 'Other User', intensity: 'actionable', icon: '🎁', chain: 'Base' },
  { id: 'base-14', text: 'Use Coinbase Wallet on Base', category: 'Other User', intensity: 'actionable', icon: '🔐', chain: 'Base' },
  { id: 'base-15', text: 'Rug pull on Base (just kidding)', category: 'Developer', intensity: 'crazy', icon: '💣', chain: 'Base' },
];

const solanaItems: ResolutionItem[] = [
  { id: 'solana-1', text: 'Create a Solana wallet (Phantom)', category: 'Other User', intensity: 'actionable', icon: '👛', chain: 'Solana' },
  { id: 'solana-2', text: 'Lend on Solend', category: 'DeFi User', intensity: 'actionable', icon: '🏦', chain: 'Solana' },
  { id: 'solana-3', text: 'Borrow on Solend', category: 'DeFi User', intensity: 'actionable', icon: '💵', chain: 'Solana' },
  { id: 'solana-4', text: 'Stake SOL', category: 'DeFi User', intensity: 'actionable', icon: '💰', chain: 'Solana' },
  { id: 'solana-5', text: 'Liquid stake SOL', category: 'DeFi User', intensity: 'actionable', icon: '💧', chain: 'Solana' },
  { id: 'solana-6', text: 'Deploy a Solana program', category: 'Developer', intensity: 'actionable', icon: '📝', chain: 'Solana' },
  { id: 'solana-7', text: 'Trade on Jupiter', category: 'DeFi User', intensity: 'actionable', icon: '💱', chain: 'Solana' },
  { id: 'solana-8', text: 'Bridge to Solana', category: 'DeFi User', intensity: 'actionable', icon: '🌉', chain: 'Solana' },
  { id: 'solana-9', text: 'Mint an NFT on Solana', category: 'Other User', intensity: 'actionable', icon: '🖼️', chain: 'Solana' },
  { id: 'solana-10', text: 'Build a dApp on Solana', category: 'Developer', intensity: 'actionable', icon: '💻', chain: 'Solana' },
  { id: 'solana-11', text: 'Farm yield on Raydium', category: 'Farmer', intensity: 'actionable', icon: '🌾', chain: 'Solana' },
  { id: 'solana-12', text: 'Ape into a Solana memecoin', category: 'Other User', intensity: 'wild', icon: '🦍', chain: 'Solana' },
  { id: 'solana-13', text: 'Create a Solana token', category: 'Founder', intensity: 'actionable', icon: '🪙', chain: 'Solana' },
  { id: 'solana-14', text: 'Use Solana for the first time', category: 'Other User', intensity: 'actionable', icon: '🆕', chain: 'Solana' },
  { id: 'solana-15', text: 'Pay $0.0001 in fees (feels good)', category: 'DeFi User', intensity: 'moderate', icon: '⛽', chain: 'Solana' },
];

// Combine all items
export const allResolutionItems: ResolutionItem[] = [
  ...developerItems,
  ...defiUserItems,
  ...contentWriterItems,
  ...marketerItems,
  ...founderItems,
  ...farmerItems,
  ...otherUserItems,
];

// Chain-specific items
export const chainItems: ResolutionItem[] = [
  ...starknetItems,
  ...ethereumItems,
  ...bitcoinItems,
  ...baseItems,
  ...solanaItems,
];

// Get chain-specific items
export function getChainItems(chains: Chain[]): ResolutionItem[] {
  if (chains.length === 0) return [];
  return chainItems.filter(item => item.chain && chains.includes(item.chain));
}

// Get items by personality types
export function getItemsByTypes(types: PersonalityType[]): ResolutionItem[] {
  if (types.length === 0) return [];
  return allResolutionItems.filter(item => types.includes(item.category));
}

// Get random items for grid
export function getRandomItemsForGrid(items: ResolutionItem[], count: number = 15): ResolutionItem[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
