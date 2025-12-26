// Personality types and their crypto resolution items
// Each category has items ranging from crazy/illegal to actionable

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
  icon: string; // lucide-react icon name
  category: PersonalityType;
  intensity: 'crazy' | 'wild' | 'moderate' | 'actionable'; // intensity level
  chain?: Chain; // Optional chain-specific item
  color?: 'red' | 'blue' | 'green'; // Optional color
}

// Developer resolutions
const developerItems: ResolutionItem[] = [
  { id: '10', text: 'Attended Devconnect Buenos Aires', icon: 'calendar', category: 'Developer', intensity: 'actionable', chain: 'Ethereum' },
  { id: '15', text: 'Attend Devcon Mumbai 2026', icon: 'calendar', category: 'Developer', intensity: 'actionable', chain: 'Ethereum' },
  { id: '18', text: 'Debate OP_CAT endlessly', icon: 'message-square', category: 'Developer', intensity: 'moderate', chain: 'Bitcoin' },
  { id: '23', text: 'Contribute to OSS', icon: 'git-pull-request', category: 'Developer', intensity: 'actionable' },
  { id: '36', text: 'Built failed DApp', icon: 'code', category: 'Developer', intensity: 'moderate' },
  { id: '46', text: 'Contribute to Bitcoin core', icon: 'git-pull-request', category: 'Developer', intensity: 'actionable', chain: 'Bitcoin' },
  { id: '52', text: 'Code ZK app Starknet', icon: 'cpu', category: 'Developer', intensity: 'moderate', chain: 'Starknet' },
  { id: '57', text: 'Built modular blockchain', icon: 'layers', category: 'Developer', intensity: 'moderate' },
  { id: '67', text: 'Audit own contract', icon: 'search', category: 'Developer', intensity: 'actionable' },
  { id: '70', text: 'Debate quantum resistance', icon: 'cpu', category: 'Developer', intensity: 'actionable' },
  { id: '73', text: 'Build cross-chain bridge', icon: 'link', category: 'Developer', intensity: 'moderate' },
  { id: '76', text: 'Fork a popular DApp', icon: 'git-fork', category: 'Developer', intensity: 'moderate' },
  { id: '83', text: 'Build restaking protocol', icon: 'code', category: 'Developer', intensity: 'actionable' },
  { id: '87', text: 'Code account abstraction', icon: 'user', category: 'Developer', intensity: 'actionable', chain: 'Ethereum' },
  { id: '92', text: 'Build AI oracle', icon: 'cpu', category: 'Developer', intensity: 'moderate' },
  { id: '96', text: 'Coded quantum breaker', icon: 'zap', category: 'Developer', intensity: 'crazy' },
  { id: '107', text: 'Code high TPS app', icon: 'code', category: 'Developer', intensity: 'actionable', chain: 'Solana' },
  { id: '111', text: 'Build smart wallet', icon: 'wallet', category: 'Developer', intensity: 'actionable' },
  { id: '117', text: 'Code exploit simulator', icon: 'cpu', category: 'Developer', intensity: 'wild' },
  { id: '121', text: 'Build AI meme bot', icon: 'bot', category: 'Developer', intensity: 'moderate' },
  { id: '127', text: 'Build BTC DeFi bridge', icon: 'link', category: 'Developer', intensity: 'wild', chain: 'Bitcoin' },
  { id: '131', text: 'Code memecoin sniper', icon: 'target', category: 'Developer', intensity: 'wild' },
  { id: '135', text: 'Build Starknet privacy app', icon: 'eye-off', category: 'Developer', intensity: 'moderate', chain: 'Starknet' },
  { id: '148', text: 'Code fraud detector', icon: 'bot', category: 'Developer', intensity: 'moderate' },
];

// DeFi User resolutions
const defiUserItems: ResolutionItem[] = [
  { id: '1', text: 'Bought the absolute top', icon: 'trending-down', category: 'DeFi User', intensity: 'wild' },
  { id: '3', text: 'Survived Balancer hack', icon: 'alert-triangle', category: 'DeFi User', intensity: 'crazy' },
  { id: '3', text: 'Survived Oct 11th Crash', icon: 'alert-triangle', category: 'DeFi User', intensity: 'crazy' },
  { id: '6', text: 'Still HODLing ETH stablecoin', icon: 'lock', category: 'DeFi User', intensity: 'actionable', chain: 'Ethereum' },
  { id: '9', text: 'Sold airdrops in 3 days', icon: 'trending-up', category: 'DeFi User', intensity: 'wild' },
  { id: '12', text: 'Bought Trump coin [REKT]', icon: 'trending-down', category: 'DeFi User', intensity: 'crazy' },
  { id: '13', text: '100x a memecoin', icon: 'bar-chart', category: 'DeFi User', intensity: 'wild' },
  { id: '20', text: 'Forever waiting alt season', icon: 'clock', category: 'DeFi User', intensity: 'moderate' },
  { id: '21', text: 'Sniped memecoin, rekt 24h', icon: 'target', category: 'DeFi User', intensity: 'crazy' },
  { id: '30', text: 'HODLed through 2025 dip', icon: 'lock', category: 'DeFi User', intensity: 'actionable' },
  { id: '32', text: 'Sold airdrop too early', icon: 'clock', category: 'DeFi User', intensity: 'wild' },
  { id: '34', text: 'Got liquidated on leverage', icon: 'alert-triangle', category: 'DeFi User', intensity: 'crazy' },
  { id: '40', text: 'Bought Bitcoin at ATH', icon: 'bitcoin', category: 'DeFi User', intensity: 'wild', chain: 'Bitcoin' },
  { id: '41', text: 'Sniped and dumped fast', icon: 'target', category: 'DeFi User', intensity: 'crazy' },
  { id: '45', text: 'Believed in altcoin supercycle', icon: 'trending-up', category: 'DeFi User', intensity: 'moderate' },
  { id: '53', text: 'Traded post-Pectra ETH', icon: 'bar-chart', category: 'DeFi User', intensity: 'actionable', chain: 'Ethereum' },
  { id: '58', text: 'Flipped Ordinals NFTs', icon: 'image', category: 'DeFi User', intensity: 'wild', chain: 'Bitcoin' },
  { id: '60', text: 'Got rekt on perpetuals', icon: 'trending-down', category: 'DeFi User', intensity: 'crazy' },
  { id: '64', text: 'Ran MEV bot', icon: 'bot', category: 'DeFi User', intensity: 'crazy' },
  { id: '66', text: 'HODLed losing memecoin', icon: 'lock', category: 'DeFi User', intensity: 'moderate' },
  { id: '71', text: 'Bought meme at peak', icon: 'trending-down', category: 'DeFi User', intensity: 'wild' },
  { id: '72', text: 'Sold bottom in panic', icon: 'trending-down', category: 'DeFi User', intensity: 'crazy' },
  { id: '80', text: 'Traded Solana memes', icon: 'bar-chart', category: 'DeFi User', intensity: 'wild', chain: 'Solana' },
  { id: '90', text: 'Exploited meme volatility', icon: 'bar-chart', category: 'DeFi User', intensity: 'crazy' },
  { id: '100', text: 'Traded Base memes', icon: 'trending-up', category: 'DeFi User', intensity: 'wild', chain: 'Base' },
  { id: '108', text: 'Flipped AI coins', icon: 'bar-chart', category: 'DeFi User', intensity: 'wild' },
  { id: '115', text: 'Ran Bitcoin MEV', icon: 'bot', category: 'DeFi User', intensity: 'crazy', chain: 'Bitcoin' },
  { id: '122', text: 'Traded post-Pectra', icon: 'trending-up', category: 'DeFi User', intensity: 'wild', chain: 'Ethereum' },
  { id: '128', text: 'Flipped Solana pumps', icon: 'bar-chart', category: 'DeFi User', intensity: 'crazy', chain: 'Solana' },
  { id: '136', text: 'Traded post-halving BTC', icon: 'bitcoin', category: 'DeFi User', intensity: 'wild', chain: 'Bitcoin' },
  { id: '149', text: 'Traded Solana narratives', icon: 'trending-up', category: 'DeFi User', intensity: 'actionable', chain: 'Solana' },
  { id: '151', text: 'Bet on Prediction markets', icon: 'trending-up', category: 'DeFi User', intensity: 'wild' },
  { id: '152', text: 'Bought ZEC < $100', icon: 'trending-up', category: 'DeFi User', intensity: 'crazy' },
];

// Content Writer resolutions
const contentWriterItems: ResolutionItem[] = [
  { id: '14', text: 'Became famous like Thiru', icon: 'star', category: 'Content Writer', intensity: 'crazy' },
  { id: '22', text: 'Earned 1000+ Yaps', icon: 'award', category: 'Content Writer', intensity: 'wild' },
  { id: '39', text: 'Debated ETH vs Solana', icon: 'message-square', category: 'Content Writer', intensity: 'moderate' },
  { id: '42', text: 'Wrote viral crypto thread', icon: 'pen-tool', category: 'Content Writer', intensity: 'moderate' },
  { id: '59', text: 'Hosted crypto spaces', icon: 'mic', category: 'Content Writer', intensity: 'actionable' },
  { id: '62', text: 'Wrote hack analysis', icon: 'file-text', category: 'Content Writer', intensity: 'actionable' },
  { id: '79', text: 'Wrote 2026 predictions', icon: 'book-open', category: 'Content Writer', intensity: 'moderate' },
  { id: '85', text: 'Wrote modular thesis', icon: 'pen-tool', category: 'Content Writer', intensity: 'moderate' },
  { id: '91', text: 'Created hack tutorial', icon: 'book-open', category: 'Content Writer', intensity: 'wild' },
  { id: '98', text: 'Wrote scaling guide', icon: 'file-text', category: 'Content Writer', intensity: 'moderate' },
  { id: '105', text: 'Wrote 2025 meme trends', icon: 'laugh', category: 'Content Writer', intensity: 'wild' },
  { id: '109', text: 'Hosted hack webinar', icon: 'mic', category: 'Content Writer', intensity: 'moderate' },
  { id: '114', text: 'Analyzed Starknet scaling', icon: 'search', category: 'Content Writer', intensity: 'moderate', chain: 'Starknet' },
  { id: '119', text: 'Wrote about 2025 hacks', icon: 'pen-tool', category: 'Content Writer', intensity: 'actionable' },
  { id: '126', text: 'Wrote regulatory thread', icon: 'book-open', category: 'Content Writer', intensity: 'actionable' },
  { id: '130', text: 'Wrote AI integration', icon: 'file-text', category: 'Content Writer', intensity: 'actionable' },
  { id: '137', text: 'Hosted meme contest', icon: 'award', category: 'Content Writer', intensity: 'actionable' },
  { id: '141', text: 'Wrote hack prevention', icon: 'pen-tool', category: 'Content Writer', intensity: 'moderate' },
  { id: '146', text: 'Created BTC meme art', icon: 'image', category: 'Content Writer', intensity: 'wild', chain: 'Bitcoin' },
  { id: '150', text: 'Wrote crypto visions', icon: 'book-open', category: 'Content Writer', intensity: 'moderate' },
];

// Marketer resolutions
const marketerItems: ResolutionItem[] = [
  { id: '35', text: 'Shilled dead memecoin', icon: 'megaphone', category: 'Marketer', intensity: 'wild' },
  { id: '55', text: 'Shilled AI narrative coins', icon: 'megaphone', category: 'Marketer', intensity: 'wild' },
  { id: '65', text: 'Created viral meme', icon: 'laugh', category: 'Marketer', intensity: 'wild' },
  { id: '74', text: 'Shilled dead project', icon: 'megaphone', category: 'Marketer', intensity: 'wild' },
  { id: '86', text: 'Marketed privacy coin', icon: 'eye-off', category: 'Marketer', intensity: 'wild' },
  { id: '94', text: 'Shilled 2026 narratives', icon: 'megaphone', category: 'Marketer', intensity: 'wild' },
  { id: '102', text: 'Marketed ZK tech', icon: 'megaphone', category: 'Marketer', intensity: 'actionable' },
  { id: '116', text: 'Shilled quantum crypto', icon: 'megaphone', category: 'Marketer', intensity: 'actionable' },
  { id: '123', text: 'Marketed Base growth', icon: 'megaphone', category: 'Marketer', intensity: 'actionable', chain: 'Base' },
  { id: '133', text: 'Shilled 2026 tech', icon: 'megaphone', category: 'Marketer', intensity: 'actionable' },
  { id: '142', text: 'Marketed ETH upgrades', icon: 'megaphone', category: 'Marketer', intensity: 'actionable', chain: 'Ethereum' },
];

// Founder resolutions
const founderItems: ResolutionItem[] = [
  { id: '19', text: 'Debated Bitcoin quantum risk', icon: 'cpu', category: 'Founder', intensity: 'actionable', chain: 'Bitcoin' },
  { id: '24', text: 'Launched Solana meme coin', icon: 'zap', category: 'Founder', intensity: 'wild', chain: 'Solana' },
  { id: '37', text: 'Rugged own testnet token', icon: 'ghost', category: 'Founder', intensity: 'crazy' },
  { id: '63', text: 'Pitched VC and failed', icon: 'briefcase', category: 'Founder', intensity: 'moderate' },
  { id: '68', text: 'Launched social token', icon: 'users', category: 'Founder', intensity: 'wild' },
  { id: '81', text: 'Launched pump clone', icon: 'zap', category: 'Founder', intensity: 'crazy' },
  { id: '89', text: 'Launched Base dApp', icon: 'upload', category: 'Founder', intensity: 'moderate', chain: 'Base' },
  { id: '99', text: 'Launched fake ICO', icon: 'ghost', category: 'Founder', intensity: 'crazy' },
  { id: '106', text: 'Launched BTC ETF clone', icon: 'bitcoin', category: 'Founder', intensity: 'crazy', chain: 'Bitcoin' },
  { id: '113', text: 'Launched Base game', icon: 'gamepad', category: 'Founder', intensity: 'wild', chain: 'Base' },
  { id: '120', text: 'Launched illegal DEX', icon: 'upload', category: 'Founder', intensity: 'crazy' },
  { id: '129', text: 'Vested founder tokens', icon: 'clock', category: 'Founder', intensity: 'moderate' },
  { id: '138', text: 'Launched rug-proof token', icon: 'shield', category: 'Founder', intensity: 'moderate' },
  { id: '147', text: 'Launched DeFi scam', icon: 'shield', category: 'Founder', intensity: 'crazy' },
];

// Farmer resolutions
const farmerItems: ResolutionItem[] = [
  { id: '7', text: 'Staked BTC on Starknet', icon: 'dollar-sign', category: 'Farmer', intensity: 'moderate', chain: 'Starknet' },
  { id: '8', text: 'Got HyperLiquid airdrop', icon: 'gift', category: 'Farmer', intensity: 'actionable' },
  { id: '25', text: 'Restaked ETH aggressively', icon: 'lock', category: 'Farmer', intensity: 'actionable', chain: 'Ethereum' },
  { id: '26', text: 'Farmed HyperLiquid points', icon: 'sprout', category: 'Farmer', intensity: 'moderate' },
  { id: '31', text: 'Farmed Starknet BTC staking', icon: 'dollar-sign', category: 'Farmer', intensity: 'moderate', chain: 'Starknet' },
  { id: '38', text: 'Farmed every L2 airdrop', icon: 'gift', category: 'Farmer', intensity: 'actionable' },
  { id: '44', text: 'Yield farmed dying protocol', icon: 'sprout', category: 'Farmer', intensity: 'wild' },
  { id: '49', text: 'Made money on runes', icon: 'dollar-sign', category: 'Farmer', intensity: 'wild', chain: 'Bitcoin' },
  { id: '50', text: 'Got Base airdrop', icon: 'gift', category: 'Farmer', intensity: 'actionable', chain: 'Base' },
  { id: '54', text: 'Farm restaking rewards', icon: 'dollar-sign', category: 'Farmer', intensity: 'moderate' },
  { id: '61', text: 'Farm on Base daily', icon: 'sprout', category: 'Farmer', intensity: 'moderate', chain: 'Base' },
  { id: '69', text: 'Farmed EigenLayer points', icon: 'gift', category: 'Farmer', intensity: 'moderate' },
  { id: '77', text: 'Yield optimized multi-chain', icon: 'dollar-sign', category: 'Farmer', intensity: 'actionable' },
  { id: '84', text: 'Farmed L2 blobs', icon: 'sprout', category: 'Farmer', intensity: 'moderate', chain: 'Ethereum' },
  { id: '93', text: 'Farmed Bitcoin runes', icon: 'dollar-sign', category: 'Farmer', intensity: 'actionable', chain: 'Bitcoin' },
  { id: '97', text: 'Yield farmed AI pools', icon: 'sprout', category: 'Farmer', intensity: 'actionable' },
  { id: '104', text: 'Farmed restaked ETH', icon: 'lock', category: 'Farmer', intensity: 'moderate' },
  { id: '112', text: 'Yield on modular chains', icon: 'dollar-sign', category: 'Farmer', intensity: 'moderate' },
  { id: '118', text: 'Farmed Solana stakes', icon: 'sprout', category: 'Farmer', intensity: 'moderate', chain: 'Solana' },
  { id: '125', text: 'Farmed ZK rewards', icon: 'dollar-sign', category: 'Farmer', intensity: 'moderate' },
  { id: '132', text: 'Farmed blob fees', icon: 'sprout', category: 'Farmer', intensity: 'moderate', chain: 'Ethereum' },
  { id: '140', text: 'Yield hunted AI', icon: 'dollar-sign', category: 'Farmer', intensity: 'wild' },
  { id: '145', text: 'Farmed Starknet ecosystem', icon: 'sprout', category: 'Farmer', intensity: 'actionable', chain: 'Starknet' },
];

// Other User resolutions
const otherUserItems: ResolutionItem[] = [
  { id: '2', text: 'Survived Bybit hack', icon: 'shield', category: 'Other User', intensity: 'crazy' },
  { id: '4', text: 'Fell for phishing attack', icon: 'user-x', category: 'Other User', intensity: 'wild' },
  { id: '5', text: 'Believed Trump moons BTC', icon: 'bitcoin', category: 'Other User', intensity: 'moderate', chain: 'Bitcoin' },
  { id: '11', text: 'Attended Solana Breakpoint', icon: 'calendar', category: 'Other User', intensity: 'moderate', chain: 'Solana' },
  { id: '16', text: 'Swapped BTC for gold', icon: 'repeat', category: 'Other User', intensity: 'moderate', chain: 'Bitcoin' },
  { id: '17', text: 'Finally exited crypto', icon: 'log-out', category: 'Other User', intensity: 'wild' },
  { id: '29', text: 'Bought top of bull run', icon: 'trending-down', category: 'Other User', intensity: 'moderate' },
  { id: '33', text: 'Attended every crypto conference', icon: 'calendar', category: 'Other User', intensity: 'actionable' },
  { id: '43', text: 'Got doxxed in hack', icon: 'user-x', category: 'Other User', intensity: 'crazy' },
  { id: '47', text: 'Ran Solana validator', icon: 'server', category: 'Other User', intensity: 'moderate', chain: 'Solana' },
  { id: '48', text: 'Lost wallet seed phrase', icon: 'alert-triangle', category: 'Other User', intensity: 'crazy' },
  { id: '56', text: 'Survived 2025 bear', icon: 'shield', category: 'Other User', intensity: 'actionable' },
  { id: '75', text: 'Got free conference ticket', icon: 'ticket', category: 'Other User', intensity: 'actionable' },
  { id: '78', text: 'Created fake wallet', icon: 'ghost', category: 'Other User', intensity: 'crazy' },
  { id: '82', text: 'Ran Bitcoin node', icon: 'server', category: 'Other User', intensity: 'moderate', chain: 'Bitcoin' },
  { id: '88', text: 'Survived exchange hack', icon: 'shield', category: 'Other User', intensity: 'crazy' },
  { id: '95', text: 'Ran Solana node', icon: 'server', category: 'Other User', intensity: 'moderate', chain: 'Solana' },
  { id: '103', text: 'Hacked oracle feed', icon: 'alert-triangle', category: 'Other User', intensity: 'crazy' },
  { id: '110', text: 'Created phishing site', icon: 'user-x', category: 'Other User', intensity: 'crazy' },
  { id: '124', text: 'Hacked Starknet account', icon: 'alert-triangle', category: 'Other User', intensity: 'crazy', chain: 'Starknet' },
  { id: '134', text: 'Exploited Base bug', icon: 'bug', category: 'Other User', intensity: 'crazy', chain: 'Base' },
  { id: '143', text: 'Ran fake airdrop', icon: 'ghost', category: 'Other User', intensity: 'crazy' },
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

// Get items by personality types
export function getItemsByTypes(types: PersonalityType[]): ResolutionItem[] {
  if (types.length === 0) return [];
  return allResolutionItems.filter(item => types.includes(item.category));
}

// Get items by chain
export function getItemsByChain(chains: Chain[]): ResolutionItem[] {
  if (chains.length === 0) return [];
  return allResolutionItems.filter(item => item.chain && chains.includes(item.chain));
}

// Get random items for grid
export function getRandomItemsForGrid(items: ResolutionItem[], count: number = 15): ResolutionItem[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
