import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

const ICON_URL_PREFIX = "assets/images/";
@Injectable()
export class IconRegistryService {
private iconSet: string[] = [
    "edit"
]
constructor(private registry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconSet.forEach(icon => {
        const iconUrl = `${ICON_URL_PREFIX}${icon}.svg`;
        this.registry.addSvgIcon(icon, sanitizer.bypassSecurityTrustResourceUrl(iconUrl));
        console.log('Registered icon', icon, iconUrl);
    });
}

}