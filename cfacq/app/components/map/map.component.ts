/// <reference types="@types/googlemaps" />
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Adresse} from '../../domaine/adresse';


@Component({
  selector: 'app-map',
  template: '<div #map class="map"></div>',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() adresse: Adresse;
  @ViewChild('map') gmapElement: any;
  map: google.maps.Map;

 constructor() { }

  ngOnInit() {
    const mapProp: any = {
      center: new google.maps.LatLng(this.adresse.lat, this.adresse.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: 'cooperative',
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
