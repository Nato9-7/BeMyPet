import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router, Route } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  edit_profile!: FormGroup;
  tempCategory: string[] = []; // Estado temporal para la categoría

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.edit_profile = this.formBuilder.group({
      username: [localStorage.getItem('username')],
      biografia: [localStorage.getItem('biografia')],
      category: [JSON.parse(localStorage.getItem('category') || '[]')],
    });

    this.tempCategory = this.edit_profile.value.category;
  }

  editprofile() {
    const { username, biografia } = this.edit_profile.value;

    localStorage.setItem('username', username);
    localStorage.setItem('biografia', biografia);
    localStorage.setItem('category', JSON.stringify(this.tempCategory));
    console.log('Perfil actualizado:', username, biografia, this.tempCategory);
  }

  handleChange(ev: CustomEvent<any>) {
    this.tempCategory = ev.detail.value; 
    this.edit_profile.patchValue({ category: this.tempCategory }); 
  }
}
