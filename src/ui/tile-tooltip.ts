/**
 * tile-tooltip.ts
 * The small hover card that describes the map plot under the cursor.
 * It shows the plot coordinates, the owner and city at the current
 * turn (skipped on unowned land), the model or player identity the
 * link supplied for that owner (skipped when none was provided),
 * and a dot-joined terrain summary.
 */

import { ElevationType, FeatureType, Tile, TileStateInfo } from '../replay/types';
import { getElevationName, getFeatureName, getTileTypeName } from '../map/utils/enum-names';
import { getCivColors } from '../utils/civ-colors';

/** Cursor offset used when placing the card, and the gap kept from the edges. */
const cursorOffset = 14;
const edgeGap = 6;

/**
 * Floating card owned by the map container, driven by ReplayMap hover events.
 */
export class TileTooltip {
	private element: HTMLDivElement;
	private coordsLine: HTMLDivElement;
	private ownerLine: HTMLDivElement;
	private modelLine: HTMLDivElement;
	private terrainLine: HTMLDivElement;
	private info: TileStateInfo | null = null;
	private annotation: string | null = null;

	/** Build the text lines inside a positioned map container. */
	constructor(container: HTMLElement) {
		this.element = document.createElement('div');
		this.element.className = 'tile-tooltip';
		this.element.hidden = true;
		this.coordsLine = document.createElement('div');
		this.coordsLine.className = 'tt-coords';
		this.ownerLine = document.createElement('div');
		this.ownerLine.className = 'tt-owner';
		this.modelLine = document.createElement('div');
		this.modelLine.className = 'tt-model';
		this.terrainLine = document.createElement('div');
		this.terrainLine.className = 'tt-terrain';
		this.element.append(this.coordsLine, this.ownerLine, this.modelLine, this.terrainLine);
		container.appendChild(this.element);
	}

	/** Whether the card is currently shown for some plot. */
	get visible(): boolean {
		return !this.element.hidden;
	}

	/** Point the card at a new plot, replacing terrain and ownership text. */
	setTile(x: number, y: number, tile: Tile, info: TileStateInfo | null, annotation: string | null = null): void {
		this.info = info;
		this.annotation = annotation;
		this.coordsLine.textContent = `X: ${x}, Y: ${y}`;
		this.renderOwner();
		this.renderModel();
		this.terrainLine.textContent = this.terrainText(tile);
		this.element.hidden = false;
	}

	/** Re-read ownership after the hovered turn changed during playback. */
	setInfo(info: TileStateInfo | null, annotation: string | null = null): void {
		if (!this.visible) return;
		this.info = info;
		this.annotation = annotation;
		this.renderOwner();
		this.renderModel();
	}

	/** Place the card beside the cursor, flipping near the container edges. */
	moveTo(point: { x: number; y: number }): void {
		const parent = this.element.parentElement;
		let left = point.x + cursorOffset;
		let top = point.y + cursorOffset;
		if (parent) {
			if (left + this.element.offsetWidth > parent.clientWidth - edgeGap) left = point.x - this.element.offsetWidth - cursorOffset;
			if (top + this.element.offsetHeight > parent.clientHeight - edgeGap) top = point.y - this.element.offsetHeight - cursorOffset;
		}
		this.element.style.left = `${Math.max(edgeGap, left)}px`;
		this.element.style.top = `${Math.max(edgeGap, top)}px`;
	}

	/** Take the card away, e.g. while dragging, zooming, or on mouseout. */
	hide(): void {
		this.element.hidden = true;
		this.info = null;
		this.annotation = null;
	}

	/** Show the model or player identity the link supplied for the owner. */
	private renderModel(): void {
		this.modelLine.textContent = this.annotation || '';
		this.modelLine.hidden = !this.annotation;
	}

	/** Draw the civilization name in its border color with the city behind it. */
	private renderOwner(): void {
		this.ownerLine.textContent = '';
		if (!this.info?.owner) {
			this.ownerLine.hidden = true;
			return;
		}
		this.ownerLine.hidden = false;
		const name = document.createElement('span');
		const colors = getCivColors(this.info.owner);
		if (colors) name.style.color = `rgb(${colors.territory.join(',')})`;
		name.textContent = this.info.owner;
		this.ownerLine.appendChild(name);
		if (this.info.city) {
			const city = document.createElement('span');
			city.className = 'tt-city';
			city.textContent = ` (${this.info.city})`;
			this.ownerLine.appendChild(city);
		}
	}

	/** Join the terrain facts that exist: type, hills or mountain, feature, river. */
	private terrainText(tile: Tile): string {
		const parts: string[] = [];
		if (tile.type >= 0) parts.push(getTileTypeName(tile.type));
		if (tile.elevation === ElevationType.Hills || tile.elevation === ElevationType.Mountain) {
			parts.push(getElevationName(tile.elevation));
		}
		if (tile.feature >= 0 && tile.feature !== FeatureType.NoFeature) parts.push(getFeatureName(tile.feature));
		const rivers = tile.rivers;
		if (Array.isArray(rivers) && rivers.some(id => id >= 0)) parts.push('River');
		return parts.join(' · ');
	}
}
