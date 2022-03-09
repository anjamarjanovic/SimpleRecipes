import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub:Subscription;
  isAuthenticated = false;
  @Output() clickedPage = new EventEmitter<string>();

  constructor( private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
     this.isAuthenticated = !!user;
    })
  }
  onSaveData(){
this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
