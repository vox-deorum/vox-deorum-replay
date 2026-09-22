/**
 * civ-colors.ts
 * Color mappings for the civilizations and city-states of a Vox Populi game.
 * Each entry carries two colors as RGB arrays [R, G, B] with values 0-255:
 * city (for city markers) and territory (for borders and the territory tint).
 *
 * Major civilizations use the two colors the game database gives them: the city
 * color is the civilization's icon color and the territory color is its background
 * color, matching how the game itself paints empire borders and banners. The
 * values come from the base game color XML, which Vox Populi leaves unchanged.
 *
 * City-states all share one neutral gray in both slots so the major
 * civilizations' colors stay the loudest thing on the map, in labels, and in
 * territory tints.
 *
 * Note: Replay files don't include color data, so these are hardcoded defaults.
 */

type RGB = [number, number, number];

export interface CivColor {
	city: RGB;
	territory: RGB;
}

export const CivColors: Record<string, CivColor> = {
	// Major civilizations
	America: { city: [255, 255, 255], territory: [31, 51, 120] },
	Arabia: { city: [146, 221, 10], territory: [43, 88, 46] },
	Assyria: { city: [255, 169, 13], territory: [255, 244, 174] },
	Austria: { city: [255, 255, 255], territory: [235, 0, 0] },
	Babylon: { city: [201, 248, 255], territory: [43, 81, 98] },
	Brazil: { city: [42, 84, 45], territory: [150, 222, 10] },
	Byzantium: { city: [61, 0, 109], territory: [114, 162, 233] },
	Carthage: { city: [81, 0, 137], territory: [205, 205, 205] },
	China: { city: [255, 255, 255], territory: [0, 149, 82] },
	Denmark: { city: [240, 231, 180], territory: [109, 43, 21] },
	Egypt: { city: [83, 0, 208], territory: [255, 252, 3] },
	England: { city: [255, 255, 255], territory: [109, 2, 0] },
	Ethiopia: { city: [255, 46, 46], territory: [2, 40, 15] },
	France: { city: [235, 235, 139], territory: [65, 141, 254] },
	Germany: { city: [37, 43, 33], territory: [179, 178, 184] },
	Greece: { city: [65, 141, 254], territory: [255, 255, 255] },
	India: { city: [255, 153, 50], territory: [18, 136, 7] },
	Indonesia: { city: [159, 47, 29], territory: [111, 211, 218] },
	Japan: { city: [184, 0, 0], territory: [255, 255, 255] },
	Korea: { city: [255, 0, 0], territory: [27, 33, 96] },
	Mongolia: { city: [255, 120, 0], territory: [81, 0, 9] },
	Morocco: { city: [40, 179, 80], territory: [145, 2, 0] },
	Persia: { city: [245, 230, 55], territory: [177, 8, 3] },
	Poland: { city: [57, 0, 0], territory: [245, 5, 0] },
	Polynesia: { city: [255, 255, 75], territory: [217, 89, 0] },
	Portugal: { city: [4, 20, 125], territory: [255, 255, 255] },
	Rome: { city: [240, 199, 0], territory: [70, 0, 118] },
	Russia: { city: [0, 0, 0], territory: [239, 180, 0] },
	Siam: { city: [177, 8, 3], territory: [245, 230, 55] },
	Songhai: { city: [90, 0, 10], territory: [214, 145, 19] },
	Spain: { city: [255, 168, 168], territory: [84, 26, 26] },
	Sweden: { city: [249, 247, 3], territory: [8, 8, 166] },
	Venice: { city: [255, 254, 216], territory: [102, 34, 162] },
	'The Aztecs': { city: [137, 239, 213], territory: [161, 57, 35] },
	'The Celts': { city: [148, 170, 255], territory: [22, 92, 63] },
	'The Huns': { city: [70, 0, 4], territory: [180, 178, 164] },
	'The Inca': { city: [7, 160, 119], territory: [255, 185, 34] },
	'The Iroquois': { city: [252, 202, 129], territory: [65, 87, 87] },
	'The Maya': { city: [24, 63, 66], territory: [198, 141, 99] },
	'The Netherlands': { city: [255, 255, 255], territory: [255, 144, 0] },
	'The Ottomans': { city: [18, 82, 30], territory: [247, 249, 200] },
	'The Shoshone': { city: [25, 240, 206], territory: [74, 59, 46] },
	'The Zulus': { city: [107, 50, 25], territory: [255, 232, 214] },
};

/**
 * City-state names present in Vox Populi. Every one of them is drawn in the
 * same neutral gray below so the major civilizations stay distinct.
 */
const cityStateNames = [
	'Abernethy', 'Aksum', 'Almaty', 'Antananarivo', 'Antwerp',
	'Argos', 'Assur', 'Aztlan', 'Ban Chiang', 'Belgrade',
	'Bogota', 'Bornu', 'Brandenburg', 'Bratislava', 'Brussels',
	'Bucharest', 'Budapest', 'Buenos Aires', 'Bunkeya', 'Byblos',
	'Cahokia', 'Cape Town', 'Colombo', 'Copenhagen', 'Djenne',
	'Dorestad', 'Dublin', 'Ecbatana', 'Edinburgh', 'Enns',
	'Eraclea', 'Florence', 'Geneva', 'Genoa', 'Hanoi',
	'Harappa', 'Heidabir', 'Helsinki', 'Holmul', 'Hong Kong',
	'Huari', 'Ife', 'Jakarta', 'Jerusalem', 'Kabul',
	'Kathmandu', 'Kuala Lumpur', 'Kwa Bulawayo', 'Kyiv', 'Kyzyl',
	'La Venta', 'Lhasa', 'Lisbon', 'Longcheng', 'Luba',
	'Lutetia', 'Malacca', 'Manila', 'Marrakech', 'Mbanza Kongo',
	'Melbourne', 'Milan', 'Mogadishu', 'Mombasa', 'Monaco',
	'Msoura', 'Nippur', 'Novgorod', 'Okilis', 'Onondaga',
	'Ormus', 'Oslo', 'Ouagadougou', 'Oviedo', 'Pago Pago',
	'Palatium', 'Panama City', 'Perge', 'Prague', 'Quebec City',
	'Ragusa', 'Raqmu', 'Riga', 'Rio De Janeiro', 'Salem',
	'Samarkand', 'Segou', 'Seoul', 'Shanghai', 'Shedet',
	'Sidon', 'Sigtuna', 'Singapore', 'Sofia', 'Sogut',
	'Sokoto', 'Stockholm', 'Sydney', 'Trowulan', 'Tyre',
	'Ur', 'Utica', 'Valletta', 'Vancouver', 'Vatican City',
	'Veligrad', 'Vienna', 'Vilnius', 'Wanggeom', 'Warsaw',
	'Wellington', 'Winchester', 'Wittenberg', 'Yamatai', 'Yerevan',
	'Zanzibar', 'Zurich', 'Zuunmod',
];

// One neutral gray for every city-state marker, border, and territory tint.
const cityStateColor: RGB = [136, 136, 136];
for (const name of cityStateNames) {
	CivColors[name] = { city: cityStateColor, territory: cityStateColor };
}

const cityStateNameSet = new Set(cityStateNames);

/** True when the civilization is a city-state rather than a major power. */
export function isCityState(civName: string): boolean {
	return cityStateNameSet.has(civName);
}

/** Perceived brightness of an RGB color on a 0-255 scale. */
function brightness(color: RGB): number {
	return 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
}

/**
 * Color a civilization's name should use on the dark tooltip. Major powers
 * paint it in their territory color, but when that color is too dark to read
 * the brighter city color stands in. City-states keep the neutral gray.
 */
export function getCivTextColor(civName: string): RGB | null {
	const colors = getCivColors(civName);
	if (!colors) return null;
	const { city, territory } = colors;
	return brightness(territory) < 90 && brightness(city) > brightness(territory) ? city : territory;
}

/**
 * Look up the color pair of a civilization by name
 */
export function getCivColors(civName: string): CivColor | null {
	return CivColors[civName] || null;
}
