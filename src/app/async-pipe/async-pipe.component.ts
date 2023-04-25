import { asNativeElements, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { combineLatest, debounceTime, filter, from, fromEvent, interval, map, mapTo, of, Subject, switchMap, take, timer, mergeMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-async-pipe',
  templateUrl: './async-pipe.component.html',
  styleUrls: ['./async-pipe.component.scss']
})
export class AsyncPipeComponent implements OnInit {
  users = [
    { id: '1', name: 'John', isActive: 'true' },
    { id: '2', name: 'Mike', isActive: 'true' },
    { id: '3', name: 'patrick', isActive: 'true' }
  ]
  userArray = ['ram', 'sita', 'ravi'];


  //of emits array, object and string
  users$ = of(this.users);

  //from emits only array 
  fromUser$ = from(this.userArray).subscribe(el => console.log('from', el));
  //map
  userNames$ = this.users$.pipe(map((users: any) =>
    users.map((user: any) => user.name)
  ));

  //mapTo always return a single value
  mapToEg$ = of(1, 2, 3, 4, 5, 6).pipe(mapTo((v: any) => v + 10)).subscribe(console.log);

  //switchMap
  switchMapSearchBar$ = fromEvent(document, 'click').pipe(debounceTime(1000), switchMap(() => interval(500))).subscribe((val: any) => (this.counter = val));


  //filter
  filteredNames$ = this.users$.pipe(filter((users: any) =>
    users.every((user: any) => user.isActive)
  ));


  //combineLatest
  data$ = combineLatest([this.users$, this.userNames$, this.filteredNames$]).pipe(map(([users, userNames, filteredNames]) => ({
    users, userNames, filteredNames
  })));


  name!: any;
  input = new FormControl()
  input1: any;
  input2: any;
  test : any=[];
  array: number[] |any;



  constructor() { }

  @ViewChild('validate')
  validate!: ElementRef;
  counter = 0;
  str = ""

  ngOnInit(): void {
    console.log('ofOperator', this.users$)
    this.name = [{ name: "Priya", id: 1, isActive: true }, { name: "Priya", id: 1 }];
    
    combineLatest([interval(1000).pipe(take(10)), this.input.valueChanges]).subscribe(res => console.log('combineLatest', res))
   this.getIndex();
  }



  //fromEvent
  rxjsObservable() {
    var clicks = fromEvent(this.validate?.nativeElement, 'click');
    clicks.subscribe(x => console.log(x));



  }


  // checkPalindrome() {
  //   // get the total length of the words  
  //   const len = this.str.length;
  //   // Use for loop to divide the words into 2 half  
  //   for (let i = 0; i < len / 2; i++) {
  //     // validate the first and last characters are the same  
  //     if (this.str[i] !== this.str[len - 1 - i]) {
  //       // alert( 'It is not palindrome'); 
  //       return;
  //     }
  //   }
  //   // If they are not the same, then it is not a palindrome
  //   console.log( 'It is a palindrome');  
  // }

  // take input of the string or number from the prompt  




  // log it's value in the console
  // console.log(value);













  display: any;
  // center: google.maps.LatLngLiteral = {
  //     lat: 24,
  //     lng: 12
  // };
  // zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }



  palindrome() {
    console.log('111111->', this.str);
    var a = this.str.split('');
    var d = a.join();
    console.log('d',d);
    
    console.log('a',a);
    var b = a.length;
    console.log('b',b);
    var c =a.reverse().join();
        console.log('c',c);
        if(d == c  ) {
        console.log('true');
      }else if (d!= c) {
        console.log('false');
      }
  }

  getIndex(){
    this.array = [3,2,4,3,5];
  var target = prompt('Target: ')  
  const len =this.array.length;
   for(let i=0; i<len; i++){
      
    if(this.array[i] + this.array[i+1] ==target){
          var tmp = i ;
       var tmp1= i+1;
        console.log('tmp',tmp)
         console.log('tmp1',tmp1)
     };
    
   }
  }
}



