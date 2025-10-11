import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CityReadDto } from '../../../models/dto/city/city-read-dto';
import { TeamCreateDto } from '../../../models/dto/team/team-create-dto';
import { TeamUpdateDto } from '../../../models/dto/team/team-update-dto';
import { AuthService } from '../../../services/auth.service';
import { TeamService } from '../../../services/team/team.service';
import { CityService } from '../../../services/city/city.service';

@Component({
  selector: 'app-team-create',
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgForOf],
  templateUrl: './team-create.component.html',
  styleUrl: './team-create.component.css',
})
export class TeamCreateComponent {
  form: FormGroup;
  isEdit = false;
  uuid: string | null = null;
  logoFile: File | null = null;
  logoPreview: string | null = null;
  logoUrlFromServer?: string;
  userName: string;
  cities: CityReadDto[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cityService: CityService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      uuidCity: ['', Validators.required],
      logo: [''],
    });

    this.uuid = this.route.snapshot.paramMap.get('uuid');

    if (this.uuid) {
      this.isEdit = true;
      this.teamService.getById(this.uuid).subscribe((team) => {
        this.form.patchValue({
          name: team.name,
          uuidCity: team.city?.uuid,
        });

        if (team.logo) {
          this.logoPreview = team.logo;
          this.logoUrlFromServer = team.logo;
        }
      });
    }

    this.userName = this.authService.getUsername() ?? 'Invitado';
    this.getCities();
  }

  getLogoSrc(): string {
    if (this.logoFile) {
      return this.logoPreview!;
    } else if (this.logoUrlFromServer) {
      return `http://localhost:5000${this.logoUrlFromServer}`;
    }
    return ''; // placeholder o vacío
  }

  getCities(): void {
    this.cityService.getAll().subscribe(
      (data: CityReadDto[]) => {
        this.cities = data;
      },
      (error) => {
        console.error('Error al cargar ciudades', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.logoFile = file;

      // Solo para previsualización temporal
      this.logoPreview = URL.createObjectURL(file);
    }
  }

  removeLogo() {
    this.logoFile = null;
    this.logoPreview = null;

    // Limpiar el input file
    const input = document.getElementById('logo') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const saveTeam = (logoPath?: string) => {
      if (this.isEdit && this.uuid) {
        const updateDto: TeamUpdateDto = {
          ...this.form.value,
          updatedBy: this.userName,
          logo: logoPath || '',
        };
        this.teamService.update(this.uuid, updateDto).subscribe(() => {
          this.router.navigate(['/team']);
        });
      } else {
        const createDto: TeamCreateDto = {
          ...this.form.value,
          createdBy: this.userName,
          logo: logoPath || '',
        };
        console.log(createDto);
        this.teamService.create(createDto).subscribe(() => {
          this.router.navigate(['/team']);
        });
      }
    };

    if (this.logoFile) {
      this.teamService.uploadLogo(this.logoFile).subscribe((res) => {
        saveTeam(res.path);
      });
    } else {
      saveTeam(this.logoUrlFromServer);
    }
  }
}
