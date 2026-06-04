import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService, coffeeImage } from './api.service';
import { AuthService } from './auth.service';
import { Coffee, Location, Order, Review, User } from './models';

@Component({
  selector: 'app-coffee-grid',
  imports: [RouterLink],
  inputs: ['coffees'],
  template: `<div class="coffee-grid">@for (coffee of coffees; track coffee.id) {<article class="coffee-card reveal"><a [routerLink]="['/catalog', coffee.id]" class="coffee-image"><img [src]="image(coffee.id)" [alt]="coffee.name"><span>{{ coffee.category }}</span></a><div class="coffee-copy"><p class="eyebrow">{{ coffee.calories }} calories</p><h3>{{ coffee.name }}</h3><p>{{ coffee.description }}</p><div class="coffee-action"><strong>Rs. {{ coffee.price }}</strong><a class="button small" [routerLink]="['/catalog', coffee.id]">Customize</a></div></div></article>}</div>`
})
export class CoffeeGrid { coffees: Coffee[] = []; image = coffeeImage; }

@Component({
  selector: 'app-coffee-carousel',
  imports: [RouterLink],
  inputs: ['coffees'],
  template: `<section class="coffee-carousel noise">@if (active(); as coffee) {<div class="carousel-copy"><div><p class="eyebrow yellow">Coffee carousel</p><h2>Choose your<br>current mood.</h2></div><div class="carousel-detail"><div class="carousel-meta"><span>{{ coffee.category }}</span>@if (coffee.isFeatured) {<b>Featured</b>}</div><h3>{{ coffee.name }}</h3><p>{{ coffee.description }}</p><div class="carousel-action"><strong>Rs. {{ coffee.price }}</strong><a class="button light-button" [routerLink]="['/catalog', coffee.id]">Customize cup</a></div></div><div class="carousel-controls"><button type="button" (click)="move(-1)" aria-label="Previous coffee">←</button><div>@for (item of coffees.slice(0,8); track item.id; let i = $index) {<button type="button" [class.active]="i === activeIndex()" (click)="activeIndex.set(i)" [attr.aria-label]="'Select ' + item.name"></button>}</div><button type="button" (click)="move(1)" aria-label="Next coffee">→</button></div></div><div class="carousel-image"><img [src]="image(coffee.id)" [alt]="coffee.name"><div class="carousel-count">0{{ activeIndex() + 1 }} / 0{{ coffees.slice(0,8).length }}</div></div>}</section>`
})
export class CoffeeCarousel {
  coffees: Coffee[] = [];
  activeIndex = signal(0);
  image = coffeeImage;
  active = () => this.coffees[this.activeIndex() % Math.max(this.coffees.length, 1)] ?? null;
  move(offset: number) {
    const length = this.coffees.slice(0, 8).length;
    if (length) this.activeIndex.set((this.activeIndex() + offset + length) % length);
  }
}

@Component({
  selector: 'app-live-cup-builder',
  template: `<section class="builder" #builder><div><p class="eyebrow yellow">Live cup builder</p><h2>Shape your<br>next cup.</h2><p>Every selection changes the preview instantly.</p><div class="builder-controls"><label>Size<select class="control" data-cup-field="size"><option>Small</option><option selected>Medium</option><option>Large</option></select></label><label>Milk<select class="control" data-cup-field="milk"><option>Whole</option><option>Oat</option><option>Almond</option></select></label><label>Sweetness<select class="control" data-cup-field="sweet"><option>None</option><option selected>Regular</option><option>Extra</option></select></label><label>Topping<select class="control" data-cup-field="topping"><option>None</option><option>Cinnamon</option><option>Caramel</option></select></label></div></div><div class="cup-stage"><div class="cup-preview"><div class="cup-steam">~~~</div><div class="cup-liquid"></div><b>BREWPOINT</b></div><p class="cup-caption">Medium · Whole · Regular · None</p></div></section>`
})
export class LiveCupBuilder implements AfterViewInit {
  @ViewChild('builder', { static: true }) builder!: ElementRef<HTMLElement>;
  ngAfterViewInit() {
    const root = this.builder.nativeElement;
    const fields = Array.from(root.querySelectorAll<HTMLSelectElement>('[data-cup-field]'));
    const caption = root.querySelector<HTMLElement>('.cup-caption');
    const cup = root.querySelector<HTMLElement>('.cup-preview');
    const render = () => {
      if (caption) caption.textContent = fields.map(field => field.value).join(' · ');
      if (cup) cup.dataset['size'] = fields[0]?.value.toLowerCase();
    };
    fields.forEach(field => field.addEventListener('change', render));
    render();
  }
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, CoffeeGrid, LiveCupBuilder],
  template: `<section class="hero"><img src="/assets/generated/brewpoint-hero.png" alt="Freshly brewed BrewPoint coffee"><div class="hero-overlay"><p class="eyebrow light">Brewed across Islamabad</p><h1>Pick up a better<br><em>coffee ritual.</em></h1><p>Small-batch coffee, thoughtful flavours, and four neighbourhood pickup points.</p><div class="actions"><a class="button" routerLink="/catalog">Order coffee</a><a class="button ghost light" routerLink="/locations">Find a roastery</a></div></div></section>
  <section class="ticker"><div>ISLAMABAD ICED LATTE · PINK CLOUD MOCHA · SAFFRON CAPPUCCINO · ROSE PISTACHIO LATTE · MIDNIGHT BLACK BREW ·</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">The seasonal edit</p><h2>Made to interrupt<br>an ordinary afternoon.</h2></div><a routerLink="/catalog">Explore the full menu →</a></div>@if (loading()) {<div class="state">Pouring the menu…</div>} @else {<app-coffee-grid [coffees]="coffees().slice(0,6)" />}</section>
  <section class="dark-section"><div class="section-head"><div><p class="eyebrow yellow">Pickup, without the queue</p><h2>Three steps between<br>you and a beautiful cup.</h2></div></div><div class="steps"><article><b>01</b><h3>Choose your pour</h3><p>Browse signature coffees and select every finishing detail.</p></article><article><b>02</b><h3>Pick your neighbourhood</h3><p>Choose the BrewPoint location already on your route.</p></article><article><b>03</b><h3>Collect when ready</h3><p>Follow the status from preparation to pickup.</p></article></div></section>
  <app-live-cup-builder />
  <section class="section map-band"><div><p class="eyebrow">Four places, one city</p><h2>Your next cup is<br>closer than it feels.</h2><p>From F-6 mornings to Blue Area afternoons and Bahria evenings.</p><a class="button" routerLink="/locations">View all locations</a></div><img src="/assets/generated/brew-process.png" alt="BrewPoint coffee preparation"></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Neighbourhood notes</p><h2>Regulars have spoken.</h2></div></div><div class="review-grid">@for (review of reviews().slice(0,3); track review.id) {<blockquote><div>★★★★★</div><p>“{{ review.comment }}”</p><cite>{{ review.userName }}</cite></blockquote>}</div></section>
  <section class="cta"><img src="/assets/generated/brew-cta.png" alt="BrewPoint pickup"><div><p class="eyebrow light">Ready when you are</p><h2>Make the next coffee<br>the one you remember.</h2><a class="button" routerLink="/catalog">Build your order</a></div></section>`
})
export class HomePage implements OnInit {
  coffees = signal<Coffee[]>([]); reviews = signal<Review[]>([]); loading = signal(true);
  constructor(private readonly api: ApiService) {}
  ngOnInit() { this.api.coffees().subscribe({ next: value => { this.coffees.set(value); this.loading.set(false); }, error: () => this.loading.set(false) }); this.api.reviews().subscribe(value => this.reviews.set(value)); }
}

@Component({
  selector: 'app-premium-home',
  imports: [RouterLink, CoffeeGrid, CoffeeCarousel, LiveCupBuilder],
  template: `<div class="home-shell">
  <section class="hero-wrap"><div class="hero noise"><img src="/assets/generated/brewpoint-hero.png" alt="Freshly brewed BrewPoint coffee"><span class="hero-stamp">EST. ISLAMABAD</span><div class="hero-overlay"><p class="eyebrow yellow">Specialty pickup coffee</p><h1>Brewed for<br><em>Islamabad.</em></h1><div class="hero-bottom"><p>Order crafted coffee from F-6, Blue Area, I-8, or Bahria Town. Customize the cup, choose a branch, and track it until ready.</p><div class="actions"><a class="button" routerLink="/catalog">Order now <span>→</span></a><a class="button ghost light" routerLink="/locations">Locations</a></div></div></div><div class="hero-stats"><article><b>12</b><span>Signature coffees</span></article><article><b>04</b><span>Pickup bars</span></article><article><b>15m</b><span>Average prep</span></article></div></div></section>
  <section class="ticker"><div>ESPRESSO BAR / PICKUP READY / ISLAMABAD ROAST / CUSTOM CUP / ESPRESSO BAR / PICKUP READY / ISLAMABAD ROAST / CUSTOM CUP /</div></section>
  <section class="section carousel-section">@if (loading()) {<div class="state">Pouring the menu...</div>} @else {<app-coffee-carousel [coffees]="coffees().slice(0,8)" />}</section>
  <section class="section"><div class="section-head split-head"><div><p class="eyebrow">Current favorites</p><h2>A warmer menu,<br>less noise.</h2></div><p>Original coffee photography, thoughtful flavour combinations, and a counter-ready pickup experience.</p></div><app-coffee-grid [coffees]="coffees().slice(0,4)" /></section>
  <section class="process-section section"><div class="process-image"><img src="/assets/generated/brew-process.png" alt="Coffee preparation"></div><div class="process-copy"><p class="eyebrow">How pickup works</p><h2>From craving<br>to counter.</h2><div class="process-grid"><article><b>01</b><h3>Choose</h3><p>Pick from twelve brewed signatures.</p></article><article><b>02</b><h3>Customize</h3><p>Size, milk, sweetness, and toppings.</p></article><article><b>03</b><h3>Select</h3><p>Choose your Islamabad pickup point.</p></article><article><b>04</b><h3>Collect</h3><p>Track your cup until it is ready.</p></article></div></div></section>
  <section class="section"><app-live-cup-builder /></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Islamabad network</p><h2>Four coffee counters.</h2></div><a class="button ghost" routerLink="/locations">See all locations</a></div><div class="location-cards">@for (place of locations(); track place.id) {<article><span>0{{ place.id }}</span><h3>{{ place.name }}</h3><p>{{ place.address }}</p><small>{{ place.openingHours }}</small></article>}</div></section>
  <section class="section map-band"><div><p class="eyebrow">Four places, one city</p><h2>Your next cup is<br>closer than it feels.</h2><p>From F-6 mornings to Blue Area afternoons and Bahria evenings.</p><a class="button" routerLink="/locations">View all locations</a></div><img src="/assets/generated/brew-process.png" alt="BrewPoint coffee preparation"></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Neighbourhood notes</p><h2>People come back<br>for the same cup.</h2></div></div><div class="review-grid">@for (review of reviews().slice(0,3); track review.id) {<blockquote><div>★★★★★</div><p>"{{ review.comment }}"</p><cite>{{ review.userName }}</cite></blockquote>}</div></section>
  <section class="cta-wrap"><div class="cta"><img src="/assets/generated/brew-cta.png" alt="BrewPoint pickup"><div><p class="eyebrow yellow">Ready for pickup</p><h2>Make the next cup deliberate.</h2><p>Browse the live catalog, personalize your cup, and track it from your dashboard.</p><a class="button" routerLink="/catalog">Order now</a></div></div></section>
  </div>`
})
export class PremiumHomePage implements OnInit {
  coffees = signal<Coffee[]>([]);
  locations = signal<Location[]>([]);
  reviews = signal<Review[]>([]);
  loading = signal(true);
  constructor(private readonly api: ApiService) {}
  ngOnInit() {
    this.api.coffees().subscribe({ next: value => { this.coffees.set(value); this.loading.set(false); }, error: () => this.loading.set(false) });
    this.api.locations().subscribe(value => this.locations.set(value));
    this.api.reviews().subscribe(value => this.reviews.set(value));
  }
}

@Component({
  selector: 'app-catalog',
  imports: [CoffeeGrid, ReactiveFormsModule],
  template: `<section class="page-intro"><p class="eyebrow yellow">BrewPoint menu</p><h1>Find your<br><em>usual.</em></h1><p>Twelve original pours, each made for pickup.</p></section><section class="section"><div class="filter-row"><input class="control" [formControl]="search" placeholder="Search the menu"><span>{{ filtered().length }} coffees</span></div>@if (loading()) {<div class="state">Loading the menu…</div>} @else if (!filtered().length) {<div class="state">No coffees match that search.</div>} @else {<app-coffee-grid [coffees]="filtered()" />}</section>`
})
export class CatalogPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  coffees = signal<Coffee[]>([]); loading = signal(true); search = this.fb.nonNullable.control('');
  filtered = signal<Coffee[]>([]);
  constructor(private readonly api: ApiService) {}
  ngOnInit() { this.api.coffees().subscribe({ next: value => { this.coffees.set(value); this.filtered.set(value); this.loading.set(false); }, error: () => this.loading.set(false) }); this.search.valueChanges.subscribe(query => this.filtered.set(this.coffees().filter(c => `${c.name} ${c.category}`.toLowerCase().includes(query.toLowerCase())))); }
}

@Component({
  selector: 'app-coffee-detail',
  imports: [CommonModule, ReactiveFormsModule],
  template: `@if (coffee(); as item) {<section class="detail"><div class="detail-image"><img [src]="image(item.id)" [alt]="item.name"></div><div class="detail-copy"><p class="eyebrow">{{ item.category }}</p><h1>{{ item.name }}</h1><p class="lead">{{ item.description }}</p><div class="facts"><span>{{ item.calories }} kcal</span><span>{{ item.ingredients.join(' · ') }}</span></div><form [formGroup]="form" (ngSubmit)="order()"><div class="form-grid"><label>Size<select formControlName="size" class="control">@for (size of item.sizeOptions; track size) {<option>{{ size }}</option>}</select></label><label>Milk<select formControlName="milkType" class="control"><option>Whole</option><option>Oat</option><option>Almond</option><option>None</option></select></label><label>Sugar<select formControlName="sugarLevel" class="control"><option>None</option><option>Light</option><option>Regular</option><option>Extra</option></select></label><label>Topping<select formControlName="toppings" class="control"><option>None</option><option>Extra shot</option><option>Caramel drizzle</option><option>Cinnamon</option></select></label><label>Location<select formControlName="locationId" class="control">@for (place of locations(); track place.id) {<option [value]="place.id">{{ place.name }}</option>}</select></label><label>Quantity<input formControlName="quantity" class="control" type="number" min="1" max="8"></label></div>@if (message()) {<p class="notice">{{ message() }}</p>}<button class="button wide" type="submit">Place pickup order · Rs. {{ item.price * form.controls.quantity.value }}</button></form></div></section>} @else {<div class="state page-space">Loading your coffee…</div>}`
})
export class CoffeeDetailPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  coffee = signal<Coffee | null>(null); locations = signal<Location[]>([]); message = signal(''); image = coffeeImage;
  form = this.fb.nonNullable.group({ size: 'Medium', milkType: 'Whole', sugarLevel: 'Regular', toppings: 'None', locationId: 1, quantity: [1, [Validators.required, Validators.min(1), Validators.max(8)]] });
  constructor(private readonly api: ApiService, private readonly route: ActivatedRoute, private readonly auth: AuthService, private readonly router: Router) {}
  ngOnInit() { const id = Number(this.route.snapshot.paramMap.get('id')); this.api.coffee(id).subscribe(value => { this.coffee.set(value); this.form.controls.size.setValue(value.sizeOptions[0] ?? 'Medium'); }); this.api.locations().subscribe(value => { this.locations.set(value); if (value[0]) this.form.controls.locationId.setValue(value[0].id); }); }
  order() { if (!this.auth.user()) { this.router.navigateByUrl('/login'); return; } const item = this.coffee(); if (!item || this.form.invalid) return; const value = this.form.getRawValue(); this.api.createOrder({ locationId: Number(value.locationId), pickupTime: new Date(Date.now() + 30 * 60000).toISOString(), items: [{ coffeeId: item.id, quantity: value.quantity, size: value.size, milkType: value.milkType, sugarLevel: value.sugarLevel, toppings: value.toppings }] }).subscribe({ next: () => { this.message.set('Order placed. We are starting your cup.'); setTimeout(() => this.router.navigateByUrl('/dashboard'), 900); }, error: error => this.message.set(error.error?.message ?? 'Could not place the order.') }); }
}

@Component({
  selector: 'app-locations',
  imports: [],
  template: `<section class="page-intro"><p class="eyebrow yellow">Across Islamabad</p><h1>Four stops.<br><em>One ritual.</em></h1></section><section class="section location-layout"><div class="location-list">@for (place of locations(); track place.id) {<article><span>0{{ place.id }}</span><div><h3>{{ place.name }}</h3><p>{{ place.address }}</p><small>{{ place.openingHours }} · {{ place.phone }}</small></div></article>}</div><div class="map"><iframe title="BrewPoint Islamabad locations" src="https://www.google.com/maps?q=Islamabad%20Pakistan&z=11&output=embed"></iframe><div class="map-label">Four BrewPoint pickup locations across Islamabad</div></div></section>`
})
export class LocationsPage implements OnInit { locations = signal<Location[]>([]); constructor(private readonly api: ApiService) {} ngOnInit() { this.api.locations().subscribe(value => this.locations.set(value)); } }

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `<section class="auth-page"><div class="auth-art"><img src="/assets/generated/coffee-dark-mocha.png" alt="Dark chocolate mocha"><div><p class="eyebrow light">Welcome back</p><h1>Your usual<br>is waiting.</h1></div></div><form [formGroup]="form" (ngSubmit)="submit()" class="auth-form"><p class="eyebrow">Member access</p><h2>Sign in</h2><label>Email<input class="control" type="email" formControlName="email"></label><label>Password<input class="control" type="password" formControlName="password"></label>@if (error()) {<p class="error">{{ error() }}</p>}<button class="button wide" [disabled]="form.invalid || busy()">{{ busy() ? 'Signing in…' : 'Sign in' }}</button><p>New here? <a routerLink="/signup">Create an account</a></p></form></section>`
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  error = signal(''); busy = signal(false); form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  constructor(private readonly auth: AuthService) {}
  submit() { if (this.form.invalid) return; this.busy.set(true); const value = this.form.getRawValue(); this.auth.login(value.email, value.password, error => { this.busy.set(false); this.error.set(error ?? ''); }); }
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  template: `<section class="auth-page"><div class="auth-art pink"><img src="/assets/generated/coffee-pink-cloud-mocha.png" alt="Pink cloud mocha"><div><p class="eyebrow light">A better pickup</p><h1>Join the<br>coffee crowd.</h1></div></div><form [formGroup]="form" (ngSubmit)="submit()" class="auth-form"><p class="eyebrow">Create account</p><h2>Start ordering</h2><label>Full name<input class="control" formControlName="fullName"></label><label>Email<input class="control" type="email" formControlName="email"></label><label>Phone<input class="control" formControlName="phone"></label><label>Password<input class="control" type="password" formControlName="password"></label>@if (error()) {<p class="error">{{ error() }}</p>}<button class="button wide" [disabled]="form.invalid || busy()">{{ busy() ? 'Creating account…' : 'Create account' }}</button><p>Already a member? <a routerLink="/login">Sign in</a></p></form></section>`
})
export class SignupPage {
  private readonly fb = inject(FormBuilder);
  error = signal(''); busy = signal(false); form = this.fb.nonNullable.group({ fullName: ['', [Validators.required, Validators.minLength(2)]], email: ['', [Validators.required, Validators.email]], phone: '', password: ['', [Validators.required, Validators.minLength(8)]] });
  constructor(private readonly auth: AuthService) {}
  submit() { if (this.form.invalid) return; this.busy.set(true); this.auth.signup(this.form.getRawValue(), error => { this.busy.set(false); this.error.set(error ?? ''); }); }
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  template: `<section class="page-intro compact"><p class="eyebrow yellow">Your BrewPoint</p><h1>Good coffee,<br><em>{{ auth.user()?.fullName }}.</em></h1><a class="button" routerLink="/catalog">Quick order</a></section><section class="section"><div class="stats"><article><b>{{ orders().length }}</b><span>Total orders</span></article><article><b>{{ activeCount() }}</b><span>Active pickups</span></article><article><b>{{ favorite() }}</b><span>Usual coffee</span></article></div><div class="section-head"><div><p class="eyebrow">Pickup history</p><h2>Your recent orders</h2></div></div>@if (!orders().length) {<div class="state">No orders yet. Your first cup is waiting.</div>} @else {<div class="order-list">@for (order of orders(); track order.id) {<article><div><span class="status">{{ order.status }}</span><h3>{{ order.orderNumber }}</h3><p>{{ order.items[0].coffeeName }} · {{ order.locationName }}</p></div><div><strong>Rs. {{ order.totalAmount }}</strong><small>{{ order.createdAt | date:'medium' }}</small></div></article>}</div>}</section>`
})
export class DashboardPage implements OnInit {
  orders = signal<Order[]>([]); activeCount = () => this.orders().filter(o => !['Completed','Cancelled'].includes(o.status)).length; favorite = () => this.orders()[0]?.items[0]?.coffeeName ?? 'Discover one';
  constructor(private readonly api: ApiService, readonly auth: AuthService) {} ngOnInit() { this.api.myOrders().subscribe(value => this.orders.set(value)); }
}

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  template: `<section class="page-intro compact"><p class="eyebrow yellow">Profile</p><h1>Your details,<br><em>kept simple.</em></h1></section><section class="section narrow"><form [formGroup]="form" (ngSubmit)="save()" class="panel form-stack"><label>Full name<input class="control" formControlName="fullName"></label><label>Email<input class="control" formControlName="email"></label><label>Phone<input class="control" formControlName="phone"></label>@if (message()) {<p class="notice">{{ message() }}</p>}<button class="button">Save profile</button></form></section>`
})
export class ProfilePage implements OnInit {
  private readonly fb = inject(FormBuilder);
  message = signal(''); form = this.fb.nonNullable.group({ fullName: ['', Validators.required], email: [{ value: '', disabled: true }], phone: '' });
  constructor(private readonly api: ApiService, private readonly auth: AuthService) {}
  ngOnInit() { const user = this.auth.user(); if (user) this.form.patchValue(user); }
  save() { const user = this.auth.user(); if (!user || this.form.invalid) return; this.api.updateUser(user.id, this.form.getRawValue()).subscribe(updated => { this.auth.user.set(updated); this.message.set('Profile updated.'); }); }
}

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ReactiveFormsModule],
  template: `<section class="page-intro compact"><p class="eyebrow yellow">BrewPoint operations</p><h1>Admin<br><em>control room.</em></h1></section><section class="section"><div class="stats"><article><b>{{ users().length }}</b><span>Members</span></article><article><b>{{ coffees().length }}</b><span>Coffees</span></article><article><b>{{ orders().length }}</b><span>Orders</span></article></div><div class="admin-grid"><div><div class="section-head"><div><p class="eyebrow">Live queue</p><h2>Orders</h2></div></div><div class="table">@for (order of orders(); track order.id) {<div class="table-row"><span><b>{{ order.orderNumber }}</b><small>{{ order.userName }} · {{ order.locationName }}</small></span><select class="control" [value]="order.status" (change)="changeStatus(order.id, $any($event.target).value)">@for (status of statuses; track status) {<option>{{ status }}</option>}</select><strong>Rs. {{ order.totalAmount }}</strong></div>}</div></div><div><div class="section-head"><div><p class="eyebrow">Menu management</p><h2>Coffees</h2></div></div><div class="table">@for (coffee of coffees(); track coffee.id) {<div class="table-row"><span><b>{{ coffee.name }}</b><small>{{ coffee.category }}</small></span><strong>Rs. {{ coffee.price }}</strong><button class="danger" (click)="removeCoffee(coffee.id)">Delete</button></div>}</div></div></div></section>`
})
export class AdminPage implements OnInit {
  users = signal<User[]>([]); coffees = signal<Coffee[]>([]); orders = signal<Order[]>([]); statuses = ['Pending','Preparing','Ready for Pickup','Completed','Cancelled'];
  constructor(private readonly api: ApiService) {}
  ngOnInit() { this.reload(); }
  reload() { this.api.users().subscribe(v => this.users.set(v)); this.api.coffees().subscribe(v => this.coffees.set(v)); this.api.orders().subscribe(v => this.orders.set(v)); }
  changeStatus(id: number, status: string) { this.api.setOrderStatus(id, status).subscribe(() => this.reload()); }
  removeCoffee(id: number) { if (confirm('Delete this coffee from the menu?')) this.api.deleteCoffee(id).subscribe(() => this.reload()); }
}
