import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fusionString } from './fusionString';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ReactiveFormsModule, 
    FormsModule, 
    CommonModule, 
    MatOptionModule, 
    MatSelectModule, 
    MatAutocompleteModule,
    NgbModule,
    MatCardModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'my-app';

  cards: Card[] = [];
  fusionStr = fusionString;

  fusedCard = {} as Card;

  monsterAFormControl = new FormControl('');
  monsterBFormControl = new FormControl('');
  monsterANames: string[] = [];
  monsterBNames: string[] = [];
  monsterAFilteredOptions: Observable<string[]> = new Observable<string[]>();
  monsterBFilteredOptions: Observable<string[]> = new Observable<string[]>();

  get monsterAKey() {
    return this.monsterAFormControl.value;
  }

  get monsterBKey() {
    return this.monsterBFormControl.value;
  }

  get isMonsterBDropdownVisible() {
    return !!this.monsterAKey && this.cards.some(x => x.name === this.monsterAKey && x.fusions.length)
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.createCardList();
    this.formatFusionString();
    this.monsterAFormControl.valueChanges.subscribe(res => {
      if(this.cards.some(x => x.name === res)) {
        this.monsterBNames = this.cards.filter(x => x.fusions.some(y => y.fusesWith === res)).map(x => x.name).sort();
        if(this.monsterAKey && this.monsterBKey) {
          const fusedMonsterName = this.cards.find(x => x.name === this.monsterAKey)?.fusions.find(x => x.fusesWith === this.monsterBKey)?.fusesInto;
          this.fusedCard = this.cards.find(x => x.name === fusedMonsterName) || {} as Card;   
        }
        else {
          this.fusedCard = {} as Card;
        }  
      }
    });
    this.monsterBFormControl.valueChanges.subscribe(res => {
      if(this.cards.some(x => x.name === res) && this.monsterAKey && this.monsterBKey) {
        const fusedMonsterName = this.cards.find(x => x.name === this.monsterAKey)?.fusions.find(x => x.fusesWith === this.monsterBKey)?.fusesInto;
        this.fusedCard = this.cards.find(x => x.name === fusedMonsterName) || {} as Card;        
      }
      else {
        this.fusedCard = {} as Card;
      }
    });
    this.monsterAFilteredOptions = this.monsterAFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterA(value || '')),
    );
    this.monsterBFilteredOptions = this.monsterBFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterB(value || '')),
    );
  }

  private _filterA(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.monsterANames.filter(name => name.toLowerCase().includes(filterValue));
  }

  private _filterB(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.monsterBNames.filter(name => name.toLowerCase().includes(filterValue));
  }

  createCard(id: string, name: string, fusions: Fusion[], imgPath: string): Card {
    return {
      id: id,
      name: name,
      fusions: fusions,
      imgPath: imgPath
    } as Card;
  }

  formatFusionString(){
    while(this.fusionStr.length > 0) {
      const monsterA = this.fusionStr.substring(0, this.fusionStr.indexOf('+') - 1).trim();
      const monsterB = this.fusionStr.substring(this.fusionStr.indexOf('+') + 2, this.fusionStr.indexOf('=') - 1).trim();
      const monsterC = this.fusionStr.substring(this.fusionStr.indexOf('=') + 2, this.fusionStr.indexOf(';')).trim();
      this.fusionStr = this.fusionStr.substring(this.fusionStr.indexOf(';') + 1, this.fusionStr.length);
      var fusion = {
        fusesWith: monsterB,
        fusesInto: monsterC,
      } as Fusion;
      this.cards.find(x => x.name === monsterA)?.fusions.push(fusion);
    }
  }

  getImgSrc(id: string) {
    return './../assets/' + id + '.png'
  }

  createCardList() {
    this.cards.push(this.createCard('001', 'B.eye White Dragon', [], ''));
    this.cards.push(this.createCard('002', 'Mystical Elf', [], ''));
    this.cards.push(this.createCard('003', 'Hitotsu-me Giant', [], ''));
    this.cards.push(this.createCard('004', 'Baby Dragon', [], ''));
    this.cards.push(this.createCard('005', 'Ryu-kishin', [], ''));
    this.cards.push(this.createCard('006', 'Feral Imp', [], ''));
    this.cards.push(this.createCard('007', 'Winged Dragon #1', [], ''));
    this.cards.push(this.createCard('008', 'Mushroom Man', [], ''));
    this.cards.push(this.createCard('009', 'Shadow Specter', [], ''));
    this.cards.push(this.createCard('010', 'Blackland Fire Dra', [], ''));
    this.cards.push(this.createCard('011', 'Sword Arm of Drago', [], ''));
    this.cards.push(this.createCard('012', 'Swamp Battleguard', [], ''));
    this.cards.push(this.createCard('013', 'Tyhone', [], ''));
    this.cards.push(this.createCard('014', 'Battle Steer', [], ''));
    this.cards.push(this.createCard('015', 'Flame Swordsman', [], ''));
    this.cards.push(this.createCard('016', 'Time Wizard', [], ''));
    this.cards.push(this.createCard('017', 'R Leg of Forbidden', [], ''));
    this.cards.push(this.createCard('018', 'L Leg of Forbidden', [], ''));
    this.cards.push(this.createCard('019', 'R Arm of Forbidden', [], ''));
    this.cards.push(this.createCard('020', 'L Arm of Forbidden', [], ''));
    this.cards.push(this.createCard('021', 'Exod. of Forbidden', [], ''));
    this.cards.push(this.createCard('022', 'Summoned Skull', [], ''));
    this.cards.push(this.createCard('023', 'The Wicked Worm B', [], ''));
    this.cards.push(this.createCard('024', 'Skull Servant', [], ''));
    this.cards.push(this.createCard('025', 'Horn Imp', [], ''));
    this.cards.push(this.createCard('026', 'Battle Ox', [], ''));
    this.cards.push(this.createCard('027', 'Beaver Warrior', [], ''));
    this.cards.push(this.createCard('028', 'Rock Ogre Grotto#1', [], ''));
    this.cards.push(this.createCard('029', 'Mountain Warrior', [], ''));
    this.cards.push(this.createCard('030', 'Zombie Warrior', [], ''));
    this.cards.push(this.createCard('031', 'Koumori Dragon', [], ''));
    this.cards.push(this.createCard('032', 'Two-headed King Re', [], ''));
    this.cards.push(this.createCard('033', 'Judge Man', [], ''));
    this.cards.push(this.createCard('034', 'Saggi the Dark Clo', [], ''));
    this.cards.push(this.createCard('035', 'D.Magician', [], ''));
    this.cards.push(this.createCard('036', 'The Snake Hair', [], ''));
    this.cards.push(this.createCard('037', 'Gaia the Dragon Ch', [], ''));
    this.cards.push(this.createCard('038', 'Gaia The Fierce Kn', [], ''));
    this.cards.push(this.createCard('039', 'Curse of Dragon', [], ''));
    this.cards.push(this.createCard('040', 'Dragon Piper', [], ''));
    this.cards.push(this.createCard('041', 'Celtic Guardian', [], ''));
    this.cards.push(this.createCard('042', 'Faceless Mage', [], ''));
    this.cards.push(this.createCard('043', 'Karbonala Warrior', [], ''));
    this.cards.push(this.createCard('044', 'Rogue Doll', [], ''));
    this.cards.push(this.createCard('045', 'Oscillo Hero #2', [], ''));
    this.cards.push(this.createCard('046', 'Griffore', [], ''));
    this.cards.push(this.createCard('047', 'Torike', [], ''));
    this.cards.push(this.createCard('048', 'Sangan', [], ''));
    this.cards.push(this.createCard('049', 'Big Insect', [], ''));
    this.cards.push(this.createCard('050', 'Basic Insect', [], ''));
    this.cards.push(this.createCard('051', 'Armored Lizard', [], ''));
    this.cards.push(this.createCard('052', 'Hercules Beetle', [], ''));
    this.cards.push(this.createCard('053', 'Killer Needle', [], ''));
    this.cards.push(this.createCard('054', 'Gokibore', [], ''));
    this.cards.push(this.createCard('055', 'Giant Flea', [], ''));
    this.cards.push(this.createCard('056', 'Larvae Moth', [], ''));
    this.cards.push(this.createCard('057', 'Great Moth', [], ''));
    this.cards.push(this.createCard('058', 'Kuriboh', [], ''));
    this.cards.push(this.createCard('059', 'Mammoth Graveyard', [], ''));
    this.cards.push(this.createCard('060', 'Great White', [], ''));
    this.cards.push(this.createCard('061', 'Wolf', [], ''));
    this.cards.push(this.createCard('062', 'Harpie Lady', [], ''));
    this.cards.push(this.createCard('063', 'Harpie Lady Sister', [], ''));
    this.cards.push(this.createCard('064', 'Tiger Axe', [], ''));
    this.cards.push(this.createCard('065', 'Silver Fang', [], ''));
    this.cards.push(this.createCard('066', 'Kojikocy', [], ''));
    this.cards.push(this.createCard('067', 'Perfectly Ultimate', [], ''));
    this.cards.push(this.createCard('068', 'Garoozis', [], ''));
    this.cards.push(this.createCard('069', 'Thousand Dragon', [], ''));
    this.cards.push(this.createCard('070', 'Fiend Kraken', [], ''));
    this.cards.push(this.createCard('071', 'Jellyfish', [], ''));
    this.cards.push(this.createCard('072', 'Cocoon of Evolutio', [], ''));
    this.cards.push(this.createCard('073', 'Kairyu-shin', [], ''));
    this.cards.push(this.createCard('074', 'Giant Rock Soldier', [], ''));
    this.cards.push(this.createCard('075', 'Man-eating Plant', [], ''));
    this.cards.push(this.createCard('076', 'Krokodilus', [], ''));
    this.cards.push(this.createCard('077', 'Grappler', [], ''));
    this.cards.push(this.createCard('078', 'Axe Raider', [], ''));
    this.cards.push(this.createCard('079', 'Megazowler', [], ''));
    this.cards.push(this.createCard('080', 'Uraby', [], ''));
    this.cards.push(this.createCard('081', 'Crawling Dragon #2', [], ''));
    this.cards.push(this.createCard('082', 'Red-eyes B. Dragon', [], ''));
    this.cards.push(this.createCard('083', 'Castle of D. Magic', [], ''));
    this.cards.push(this.createCard('084', 'Reaper of the Card', [], ''));
    this.cards.push(this.createCard('085', 'King of Yamimakai', [], ''));
    this.cards.push(this.createCard('086', 'Barox', [], ''));
    this.cards.push(this.createCard('087', 'Dark Chimera', [], ''));
    this.cards.push(this.createCard('088', 'Metal Guardian', [], ''));
    this.cards.push(this.createCard('089', 'Catapult Turtle', [], ''));
    this.cards.push(this.createCard('090', 'Gyakutenno Megami', [], ''));
    this.cards.push(this.createCard('091', 'Mystic Horseman', [], ''));
    this.cards.push(this.createCard('092', 'Rabid Horseman', [], ''));
    this.cards.push(this.createCard('093', 'Zanki', [], ''));
    this.cards.push(this.createCard('094', 'Crawling Dragon', [], ''));
    this.cards.push(this.createCard('095', 'Crass Clown', [], ''));
    this.cards.push(this.createCard('096', 'Armored Zombie', [], ''));
    this.cards.push(this.createCard('097', 'Dragon Zombie', [], ''));
    this.cards.push(this.createCard('098', 'Clown Zombie', [], ''));
    this.cards.push(this.createCard('099', 'Pumpking the King', [], ''));
    this.cards.push(this.createCard('100', 'Battle Warrior', [], ''));
    this.cards.push(this.createCard('101', 'Wings of Wicked Fl', [], ''));
    this.cards.push(this.createCard('102', 'Mask of Darkness', [], ''));
    this.cards.push(this.createCard('103', 'Job-change Mirror', [], ''));
    this.cards.push(this.createCard('104', 'Curtain of the Dar', [], ''));
    this.cards.push(this.createCard('105', 'Tomozaurus', [], ''));
    this.cards.push(this.createCard('106', 'Spirit of the Wind', [], ''));
    this.cards.push(this.createCard('107', 'Kageningen', [], ''));
    this.cards.push(this.createCard('108', 'Graveyard & Hand', [], ''));
    this.cards.push(this.createCard('109', 'All-seeing Goddess', [], ''));
    this.cards.push(this.createCard('110', 'Hero of the East', [], ''));
    this.cards.push(this.createCard('111', 'Doma The Angel of', [], ''));
    this.cards.push(this.createCard('112', 'Life Eater', [], ''));
    this.cards.push(this.createCard('113', 'Dark Gray', [], ''));
    this.cards.push(this.createCard('114', 'White Magical Hat', [], ''));
    this.cards.push(this.createCard('115', 'Kamionwizard', [], ''));
    this.cards.push(this.createCard('116', 'Nightmare Scorpion', [], ''));
    this.cards.push(this.createCard('117', 'Spirit of the Book', [], ''));
    this.cards.push(this.createCard('118', 'Supporter in the S', [], ''));
    this.cards.push(this.createCard('119', 'Trial of Nightmare', [], ''));
    this.cards.push(this.createCard('120', 'Dream Clown', [], ''));
    this.cards.push(this.createCard('121', 'Sleeping Lion', [], ''));
    this.cards.push(this.createCard('122', 'Yamatano Dragon Sc', [], ''));
    this.cards.push(this.createCard('123', 'Dark Plant', [], ''));
    this.cards.push(this.createCard('124', 'Ancient Tool', [], ''));
    this.cards.push(this.createCard('125', 'Faith Bird', [], ''));
    this.cards.push(this.createCard('126', 'Orion the Battle K', [], ''));
    this.cards.push(this.createCard('127', 'Ansatsu', [], ''));
    this.cards.push(this.createCard('128', 'LaMoon', [], ''));
    this.cards.push(this.createCard('129', 'Nemuriko', [], ''));
    this.cards.push(this.createCard('130', 'Weather Control', [], ''));
    this.cards.push(this.createCard('131', 'Octoberser', [], ''));
    this.cards.push(this.createCard('132', 'The 13th Grave', [], ''));
    this.cards.push(this.createCard('133', 'Charubin the Fire', [], ''));
    this.cards.push(this.createCard('134', 'Mystical Capture C', [], ''));
    this.cards.push(this.createCard('135', 'Fiend\'s Hand', [], ''));
    this.cards.push(this.createCard('136', 'Witty Phantom', [], ''));
    this.cards.push(this.createCard('137', 'Mystery Hand', [], ''));
    this.cards.push(this.createCard('138', 'Dragon Statue', [], ''));
    this.cards.push(this.createCard('139', 'B.eye Silv. Zombie', [], ''));
    this.cards.push(this.createCard('140', 'Toad Master', [], ''));
    this.cards.push(this.createCard('141', 'Spiked Snail', [], ''));
    this.cards.push(this.createCard('142', 'Flame Manipulator', [], ''));
    this.cards.push(this.createCard('143', 'Chronolord', [], ''));
    this.cards.push(this.createCard('144', 'Wind Djinn', [], ''));
    this.cards.push(this.createCard('145', 'Phantom Thief', [], ''));
    this.cards.push(this.createCard('146', 'Temple of Skulls', [], ''));
    this.cards.push(this.createCard('147', 'Monster Egg', [], ''));
    this.cards.push(this.createCard('148', 'Sinister Shadow', [], ''));
    this.cards.push(this.createCard('149', 'Lord of the Lamp', [], ''));
    this.cards.push(this.createCard('150', 'Akihiron', [], ''));
    this.cards.push(this.createCard('151', 'Rhaimundos of the', [], ''));
    this.cards.push(this.createCard('152', 'The Melting Red Sh', [], ''));
    this.cards.push(this.createCard('153', 'Dokuroizo the Grim', [], ''));
    this.cards.push(this.createCard('154', 'Fire Reaper', [], ''));
    this.cards.push(this.createCard('155', 'Larvas', [], ''));
    this.cards.push(this.createCard('156', 'Hard Armor', [], ''));
    this.cards.push(this.createCard('157', 'Firegrass', [], ''));
    this.cards.push(this.createCard('158', 'Man Eater', [], ''));
    this.cards.push(this.createCard('159', 'Dig Beak', [], ''));
    this.cards.push(this.createCard('160', 'M-warrior #1', [], ''));
    this.cards.push(this.createCard('161', 'M-warrior #2', [], ''));
    this.cards.push(this.createCard('162', 'Tainted Wisdom', [], ''));
    this.cards.push(this.createCard('163', 'Lisark', [], ''));
    this.cards.push(this.createCard('164', 'Lord of Zemia', [], ''));
    this.cards.push(this.createCard('165', 'The Judgement Hand', [], ''));
    this.cards.push(this.createCard('166', 'Mysterious Puppete', [], ''));
    this.cards.push(this.createCard('167', 'Ancient Jar', [], ''));
    this.cards.push(this.createCard('168', 'Darkfire Dragon', [], ''));
    this.cards.push(this.createCard('169', 'Dark King of the A', [], ''));
    this.cards.push(this.createCard('170', 'Spirit of the Harp', [], ''));
    this.cards.push(this.createCard('171', 'Big Eye', [], ''));
    this.cards.push(this.createCard('172', 'Armaill', [], ''));
    this.cards.push(this.createCard('173', 'Dark Prisoner', [], ''));
    this.cards.push(this.createCard('174', 'Hurricail', [], ''));
    this.cards.push(this.createCard('175', 'Ancient Brain', [], ''));
    this.cards.push(this.createCard('176', 'Fire Eye', [], ''));
    this.cards.push(this.createCard('177', 'Monsturtle', [], ''));
    this.cards.push(this.createCard('178', 'Claw Reacher', [], ''));
    this.cards.push(this.createCard('179', 'Phantom Dewan', [], ''));
    this.cards.push(this.createCard('180', 'Arlownay', [], ''));
    this.cards.push(this.createCard('181', 'Dark Shade', [], ''));
    this.cards.push(this.createCard('182', 'Masked Clown', [], ''));
    this.cards.push(this.createCard('183', 'Lucky Trinket', [], ''));
    this.cards.push(this.createCard('184', 'Genin', [], ''));
    this.cards.push(this.createCard('185', 'Eyearmor', [], ''));
    this.cards.push(this.createCard('186', 'Fiend Reflection#2', [], ''));
    this.cards.push(this.createCard('187', 'Gate Deeg', [], ''));
    this.cards.push(this.createCard('188', 'Synchar', [], ''));
    this.cards.push(this.createCard('189', 'Fusionist', [], ''));
    this.cards.push(this.createCard('190', 'Akakieisu', [], ''));
    this.cards.push(this.createCard('191', 'LaLa Li-oon', [], ''));
    this.cards.push(this.createCard('192', 'Key Mace', [], ''));
    this.cards.push(this.createCard('193', 'Turtle Tiger', [], ''));
    this.cards.push(this.createCard('194', 'Terra the Terrible', [], ''));
    this.cards.push(this.createCard('195', 'Doron', [], ''));
    this.cards.push(this.createCard('196', 'Arma Knight', [], ''));
    this.cards.push(this.createCard('197', 'Mech Mole Zombie', [], ''));
    this.cards.push(this.createCard('198', 'Happy Lover', [], ''));
    this.cards.push(this.createCard('199', 'Penguin Knight', [], ''));
    this.cards.push(this.createCard('200', 'Petit Dragon', [], ''));
    this.cards.push(this.createCard('201', 'Frenzied Panda', [], ''));
    this.cards.push(this.createCard('202', 'Air Marmot of Nefa', [], ''));
    this.cards.push(this.createCard('203', 'Phantom Ghost', [], ''));
    this.cards.push(this.createCard('204', 'Mabarrel', [], ''));
    this.cards.push(this.createCard('205', 'Dorover', [], ''));
    this.cards.push(this.createCard('206', 'Twin Long Rods #1', [], ''));
    this.cards.push(this.createCard('207', 'Droll Bird', [], ''));
    this.cards.push(this.createCard('208', 'Petit Angel', [], ''));
    this.cards.push(this.createCard('209', 'Winged Cleaver', [], ''));
    this.cards.push(this.createCard('210', 'Hinotama Soul', [], ''));
    this.cards.push(this.createCard('211', 'Kaminarikozou', [], ''));
    this.cards.push(this.createCard('212', 'Meotoko', [], ''));
    this.cards.push(this.createCard('213', 'Aqua Madoor', [], ''));
    this.cards.push(this.createCard('214', 'B. Flame Kagemusha', [], ''));
    this.cards.push(this.createCard('215', 'Flame Ghost', [], ''));
    this.cards.push(this.createCard('216', 'Dryad', [], ''));
    this.cards.push(this.createCard('217', 'B. Skull Dragon', [], ''));
    this.cards.push(this.createCard('218', 'Two-mouth Darkrule', [], ''));
    this.cards.push(this.createCard('219', 'Solitude', [], ''));
    this.cards.push(this.createCard('220', 'Masked Sorcerer', [], ''));
    this.cards.push(this.createCard('221', 'Kumootoko', [], ''));
    this.cards.push(this.createCard('222', 'Midnight Fiend', [], ''));
    this.cards.push(this.createCard('223', 'Roaring Ocean Snak', [], ''));
    this.cards.push(this.createCard('224', 'Trap Master', [], ''));
    this.cards.push(this.createCard('225', 'Fiend Sword', [], ''));
    this.cards.push(this.createCard('226', 'Skull Stalker', [], ''));
    this.cards.push(this.createCard('227', 'Hitodenchak', [], ''));
    this.cards.push(this.createCard('228', 'Wood Remains', [], ''));
    this.cards.push(this.createCard('229', 'Hourglass of Life', [], ''));
    this.cards.push(this.createCard('230', 'Rare Fish', [], ''));
    this.cards.push(this.createCard('231', 'Wood Clown', [], ''));
    this.cards.push(this.createCard('232', 'Madjinn Gunn', [], ''));
    this.cards.push(this.createCard('233', 'Dark Titan of Terr', [], ''));
    this.cards.push(this.createCard('234', 'Beautiful Headhunt', [], ''));
    this.cards.push(this.createCard('235', 'Wodan the Resident', [], ''));
    this.cards.push(this.createCard('236', 'Guardian of the La', [], ''));
    this.cards.push(this.createCard('237', 'Haniwa', [], ''));
    this.cards.push(this.createCard('238', 'Yashinoki', [], ''));
    this.cards.push(this.createCard('239', 'Vishwar Randi', [], ''));
    this.cards.push(this.createCard('240', 'The Drdek', [], ''));
    this.cards.push(this.createCard('241', 'Dark Assailant', [], ''));
    this.cards.push(this.createCard('242', 'Candle of Destiny', [], ''));
    this.cards.push(this.createCard('243', 'Water Element', [], ''));
    this.cards.push(this.createCard('244', 'Dissolverock', [], ''));
    this.cards.push(this.createCard('245', 'Meda Bat', [], ''));
    this.cards.push(this.createCard('246', 'One Who Hunts Soul', [], ''));
    this.cards.push(this.createCard('247', 'Root Water', [], ''));
    this.cards.push(this.createCard('248', 'Master & Expert', [], ''));
    this.cards.push(this.createCard('249', 'Water Omotics', [], ''));
    this.cards.push(this.createCard('250', 'Hyo', [], ''));
    this.cards.push(this.createCard('251', 'Enchanting Mermaid', [], ''));
    this.cards.push(this.createCard('252', 'Nekogal #1', [], ''));
    this.cards.push(this.createCard('253', 'Angelwitch', [], ''));
    this.cards.push(this.createCard('254', 'Embryonic Beast', [], ''));
    this.cards.push(this.createCard('255', 'Prevent Rat', [], ''));
    this.cards.push(this.createCard('256', 'Dimensional Knight', [], ''));
    this.cards.push(this.createCard('257', 'Stone Armadiller', [], ''));
    this.cards.push(this.createCard('258', 'Beastking of the S', [], ''));
    this.cards.push(this.createCard('259', 'Ancient Sorcerer', [], ''));
    this.cards.push(this.createCard('260', 'Lunar Queen Elzaim', [], ''));
    this.cards.push(this.createCard('261', 'Wicked Mirror', [], ''));
    this.cards.push(this.createCard('262', 'The Little Swordsm', [], ''));
    this.cards.push(this.createCard('263', 'Rock Ogre Grotto#2', [], ''));
    this.cards.push(this.createCard('264', 'Wing Egg Elf', [], ''));
    this.cards.push(this.createCard('265', 'Sea King of Fury', [], ''));
    this.cards.push(this.createCard('266', 'Princess of Tsurug', [], ''));
    this.cards.push(this.createCard('267', 'Unknown Warrior of', [], ''));
    this.cards.push(this.createCard('268', 'Sectarian of Secre', [], ''));
    this.cards.push(this.createCard('269', 'Versago the Destro', [], ''));
    this.cards.push(this.createCard('270', 'Wetha', [], ''));
    this.cards.push(this.createCard('271', 'Megirus Light', [], ''));
    this.cards.push(this.createCard('272', 'Mavelus', [], ''));
    this.cards.push(this.createCard('273', 'Ancient Tree of En', [], ''));
    this.cards.push(this.createCard('274', 'Green Phantom King', [], ''));
    this.cards.push(this.createCard('275', 'Terra Bugroth', [], ''));
    this.cards.push(this.createCard('276', 'Ray & Temperature', [], ''));
    this.cards.push(this.createCard('277', 'Gorgon Egg', [], ''));
    this.cards.push(this.createCard('278', 'Petit Moth', [], ''));
    this.cards.push(this.createCard('279', 'King Fog', [], ''));
    this.cards.push(this.createCard('280', 'Protector of the T', [], ''));
    this.cards.push(this.createCard('281', 'Mystic Clown', [], ''));
    this.cards.push(this.createCard('282', 'Mystical Sheep #2', [], ''));
    this.cards.push(this.createCard('283', 'Holograh', [], ''));
    this.cards.push(this.createCard('284', 'Tao the Chanter', [], ''));
    this.cards.push(this.createCard('285', 'Serpent Marauder', [], ''));
    this.cards.push(this.createCard('286', 'Gatekeeper', [], ''));
    this.cards.push(this.createCard('287', 'Ogre of the Black', [], ''));
    this.cards.push(this.createCard('288', 'Dark Artist', [], ''));
    this.cards.push(this.createCard('289', 'Change Slime', [], ''));
    this.cards.push(this.createCard('290', 'Moon Envoy', [], ''));
    this.cards.push(this.createCard('291', 'Fireyarou', [], ''));
    this.cards.push(this.createCard('292', 'Psychic Kappa', [], ''));
    this.cards.push(this.createCard('293', 'Masaki the Legenda', [], ''));
    this.cards.push(this.createCard('294', 'Dragoness the Wick', [], ''));
    this.cards.push(this.createCard('295', 'Bio Plant', [], ''));
    this.cards.push(this.createCard('296', 'One-eyed Shield Dr', [], ''));
    this.cards.push(this.createCard('297', 'Cyber Soldier of D', [], ''));
    this.cards.push(this.createCard('298', 'Wicked Dragon with', [], ''));
    this.cards.push(this.createCard('299', 'Sonic Maid', [], ''));
    this.cards.push(this.createCard('300', 'Kurama', [], ''));
    this.cards.push(this.createCard('351', 'Yaranzo', [], ''));
    this.cards.push(this.createCard('352', 'Kanan the Swordmis', [], ''));
    this.cards.push(this.createCard('353', 'Takriminos', [], ''));
    this.cards.push(this.createCard('354', 'Stuffed Animal', [], ''));
    this.cards.push(this.createCard('355', 'Megasonic Eye', [], ''));
    this.cards.push(this.createCard('356', 'Super War-lion', [], ''));
    this.cards.push(this.createCard('357', 'Yamadron', [], ''));
    this.cards.push(this.createCard('358', 'Seiyaryu', [], ''));
    this.cards.push(this.createCard('359', 'Three-legged Zombi', [], ''));
    this.cards.push(this.createCard('360', 'Zera The Mant', [], ''));
    this.cards.push(this.createCard('361', 'Flying Penguin', [], ''));
    this.cards.push(this.createCard('362', 'Millennium Shield', [], ''));
    this.cards.push(this.createCard('363', 'Fairy\'s Gift', [], ''));
    this.cards.push(this.createCard('364', 'Black Luster Soldi', [], ''));
    this.cards.push(this.createCard('365', 'Fiend\'s Mirror', [], ''));
    this.cards.push(this.createCard('366', 'Labyrinth Wall', [], ''));
    this.cards.push(this.createCard('367', 'Jirai Gumo', [], ''));
    this.cards.push(this.createCard('368', 'Shadow Ghoul', [], ''));
    this.cards.push(this.createCard('369', 'Wall Shadow', [], ''));
    this.cards.push(this.createCard('370', 'Labyrinth Tank', [], ''));
    this.cards.push(this.createCard('371', 'Sanga of the Thund', [], ''));
    this.cards.push(this.createCard('372', 'Kazejin', [], ''));
    this.cards.push(this.createCard('373', 'Suijin', [], ''));
    this.cards.push(this.createCard('374', 'Gate Guardian', [], ''));
    this.cards.push(this.createCard('375', 'Dungeon Worm', [], ''));
    this.cards.push(this.createCard('376', 'Monster Tamer', [], ''));
    this.cards.push(this.createCard('377', 'Ryu-kishin Powered', [], ''));
    this.cards.push(this.createCard('378', 'Swordstalker', [], ''));
    this.cards.push(this.createCard('379', 'La Jinn The Mystic', [], ''));
    this.cards.push(this.createCard('380', 'B.eye Ultra Dragon', [], ''));
    this.cards.push(this.createCard('381', 'Toon Alligator', [], ''));
    this.cards.push(this.createCard('382', 'Rude Kaiser', [], ''));
    this.cards.push(this.createCard('383', 'Parrot Dragon', [], ''));
    this.cards.push(this.createCard('384', 'Dark Rabbit', [], ''));
    this.cards.push(this.createCard('385', 'Bickuribox', [], ''));
    this.cards.push(this.createCard('386', 'Harpie\'s Pet Drago', [], ''));
    this.cards.push(this.createCard('387', 'Mystic Lamp', [], ''));
    this.cards.push(this.createCard('388', 'Pendulum Machine', [], ''));
    this.cards.push(this.createCard('389', 'Giltia the D. Knig', [], ''));
    this.cards.push(this.createCard('390', 'Launcher Spider', [], ''));
    this.cards.push(this.createCard('391', 'Zoa', [], ''));
    this.cards.push(this.createCard('392', 'Metalzoa', [], ''));
    this.cards.push(this.createCard('393', 'Zone Eater', [], ''));
    this.cards.push(this.createCard('394', 'Steel Scorpion', [], ''));
    this.cards.push(this.createCard('395', 'Dancing Elf', [], ''));
    this.cards.push(this.createCard('396', 'Ocubeam', [], ''));
    this.cards.push(this.createCard('397', 'Leghul', [], ''));
    this.cards.push(this.createCard('398', 'Ooguchi', [], ''));
    this.cards.push(this.createCard('399', 'Swordsman from a F', [], ''));
    this.cards.push(this.createCard('400', 'Emperor of the Lan', [], ''));
    this.cards.push(this.createCard('401', 'Ushi Oni', [], ''));
    this.cards.push(this.createCard('402', 'Monster Eye', [], ''));
    this.cards.push(this.createCard('403', 'Leogun', [], ''));
    this.cards.push(this.createCard('404', 'Tatsunootoshigo', [], ''));
    this.cards.push(this.createCard('405', 'Saber Slasher', [], ''));
    this.cards.push(this.createCard('406', 'Yaiba Robo', [], ''));
    this.cards.push(this.createCard('407', 'Machine King', [], ''));
    this.cards.push(this.createCard('408', 'Giant Mech-soldier', [], ''));
    this.cards.push(this.createCard('409', 'Metal Dragon', [], ''));
    this.cards.push(this.createCard('410', 'Mechanical Spider', [], ''));
    this.cards.push(this.createCard('411', 'Bat', [], ''));
    this.cards.push(this.createCard('412', 'Giga-tech Wolf', [], ''));
    this.cards.push(this.createCard('413', 'Cyber Soldier', [], ''));
    this.cards.push(this.createCard('414', 'Shovel Crusher', [], ''));
    this.cards.push(this.createCard('415', 'Mechanicalchacer', [], ''));
    this.cards.push(this.createCard('416', 'Blocker', [], ''));
    this.cards.push(this.createCard('417', 'Blast Juggler', [], ''));
    this.cards.push(this.createCard('418', 'Golgoil', [], ''));
    this.cards.push(this.createCard('419', 'Giganto', [], ''));
    this.cards.push(this.createCard('420', 'Cyber-Stein', [], ''));
    this.cards.push(this.createCard('421', 'Cyber Commander', [], ''));
    this.cards.push(this.createCard('422', 'Jinzo #7', [], ''));
    this.cards.push(this.createCard('423', 'Dice Armadillo', [], ''));
    this.cards.push(this.createCard('424', 'Sky Dragon', [], ''));
    this.cards.push(this.createCard('425', 'Thunder Dragon', [], ''));
    this.cards.push(this.createCard('426', 'Stone D.', [], ''));
    this.cards.push(this.createCard('427', 'Kaiser Dragon', [], ''));
    this.cards.push(this.createCard('428', 'Magician of Faith', [], ''));
    this.cards.push(this.createCard('429', 'Goddess of Whim', [], ''));
    this.cards.push(this.createCard('430', 'Water Magician', [], ''));
    this.cards.push(this.createCard('431', 'Ice Water', [], ''));
    this.cards.push(this.createCard('432', 'Waterdragon Fairy', [], ''));
    this.cards.push(this.createCard('433', 'Ancient Elf', [], ''));
    this.cards.push(this.createCard('434', 'Beautiful Beast Tr', [], ''));
    this.cards.push(this.createCard('435', 'Water Girl', [], ''));
    this.cards.push(this.createCard('436', 'White Dolphin', [], ''));
    this.cards.push(this.createCard('437', 'Deepsea Shark', [], ''));
    this.cards.push(this.createCard('438', 'Metal Fish', [], ''));
    this.cards.push(this.createCard('439', 'Bottom Dweller', [], ''));
    this.cards.push(this.createCard('440', '7 Colored Fish', [], ''));
    this.cards.push(this.createCard('441', 'Mech Bass', [], ''));
    this.cards.push(this.createCard('442', 'Aqua Dragon', [], ''));
    this.cards.push(this.createCard('443', 'Sea King Dragon', [], ''));
    this.cards.push(this.createCard('444', 'Turu-Purun', [], ''));
    this.cards.push(this.createCard('445', 'Sea Guardian', [], ''));
    this.cards.push(this.createCard('446', 'Aqua Snake', [], ''));
    this.cards.push(this.createCard('447', 'Giant Red Seasnake', [], ''));
    this.cards.push(this.createCard('448', 'Spike Seadra', [], ''));
    this.cards.push(this.createCard('449', 'Ancient W.Turtle', [], ''));
    this.cards.push(this.createCard('450', 'Kappa Avenger', [], ''));
    this.cards.push(this.createCard('451', 'Kanikabuto', [], ''));
    this.cards.push(this.createCard('452', 'Zarigun', [], ''));
    this.cards.push(this.createCard('453', 'Millennium Golem', [], ''));
    this.cards.push(this.createCard('454', 'Destroyer Golem', [], ''));
    this.cards.push(this.createCard('455', 'Barrel Rock', [], ''));
    this.cards.push(this.createCard('456', 'Minomushi Warrior', [], ''));
    this.cards.push(this.createCard('457', 'Stone Ghost', [], ''));
    this.cards.push(this.createCard('458', 'Kaminari Attack', [], ''));
    this.cards.push(this.createCard('459', 'Tripwire Beast', [], ''));
    this.cards.push(this.createCard('460', 'Bolt Escargot', [], ''));
    this.cards.push(this.createCard('461', 'Bolt Penguin', [], ''));
    this.cards.push(this.createCard('462', 'The Immortal of Th', [], ''));
    this.cards.push(this.createCard('463', 'Electric Snake', [], ''));
    this.cards.push(this.createCard('464', 'Wing Eagle', [], ''));
    this.cards.push(this.createCard('465', 'Punished Eagle', [], ''));
    this.cards.push(this.createCard('466', 'Skull Red Bird', [], ''));
    this.cards.push(this.createCard('467', 'Crimson Sunbird', [], ''));
    this.cards.push(this.createCard('468', 'Queen Bird', [], ''));
    this.cards.push(this.createCard('469', 'Armed Ninja', [], ''));
    this.cards.push(this.createCard('470', 'Magical Ghost', [], ''));
    this.cards.push(this.createCard('471', 'Soul Hunter', [], ''));
    this.cards.push(this.createCard('472', 'Inhaler', [], ''));
    this.cards.push(this.createCard('473', 'Vermillion Sparrow', [], ''));
    this.cards.push(this.createCard('474', 'Sea Kamen', [], ''));
    this.cards.push(this.createCard('475', 'Sinister Serpent', [], ''));
    this.cards.push(this.createCard('476', 'Spider Crab', [], ''));
    this.cards.push(this.createCard('477', 'Alinsection', [], ''));
    this.cards.push(this.createCard('478', 'Insect Soldiers of', [], ''));
    this.cards.push(this.createCard('479', 'Cockroach Knight', [], ''));
    this.cards.push(this.createCard('480', 'Kuwagata a', [], ''));
    this.cards.push(this.createCard('481', 'Burglar', [], ''));
    this.cards.push(this.createCard('482', 'Pragtical', [], ''));
    this.cards.push(this.createCard('483', 'Garvas', [], ''));
    this.cards.push(this.createCard('484', 'Ameba', [], ''));
    this.cards.push(this.createCard('485', 'Korogashi', [], ''));
    this.cards.push(this.createCard('486', 'Boo Koo', [], ''));
    this.cards.push(this.createCard('487', 'Flower Wolf', [], ''));
    this.cards.push(this.createCard('488', 'Rainbow Flower', [], ''));
    this.cards.push(this.createCard('489', 'Barrel Lily', [], ''));
    this.cards.push(this.createCard('490', 'Needle Ball', [], ''));
    this.cards.push(this.createCard('491', 'Peacock', [], ''));
    this.cards.push(this.createCard('492', 'Hoshiningen', [], ''));
    this.cards.push(this.createCard('493', 'Maha Vailo', [], ''));
    this.cards.push(this.createCard('494', 'Rainbow Marine Mer', [], ''));
    this.cards.push(this.createCard('495', 'Musician King', [], ''));
    this.cards.push(this.createCard('496', 'Wilmee', [], ''));
    this.cards.push(this.createCard('497', 'Yado Karu', [], ''));
    this.cards.push(this.createCard('498', 'Morinphen', [], ''));
    this.cards.push(this.createCard('499', 'Kattapillar', [], ''));
    this.cards.push(this.createCard('500', 'Dragon Seeker', [], ''));
    this.cards.push(this.createCard('501', 'Man-eater Bug', [], ''));
    this.cards.push(this.createCard('502', 'D. Human', [], ''));
    this.cards.push(this.createCard('503', 'Turtle Raccoon', [], ''));
    this.cards.push(this.createCard('504', 'Fungi of the Musk', [], ''));
    this.cards.push(this.createCard('505', 'Prisman', [], ''));
    this.cards.push(this.createCard('506', 'Gale Dogra', [], ''));
    this.cards.push(this.createCard('507', 'Crazy Fish', [], ''));
    this.cards.push(this.createCard('508', 'Cyber Saurus', [], ''));
    this.cards.push(this.createCard('509', 'Bracchio-raidus', [], ''));
    this.cards.push(this.createCard('510', 'Laughing Flower', [], ''));
    this.cards.push(this.createCard('511', 'Bean Soldier', [], ''));
    this.cards.push(this.createCard('512', 'Cannon Soldier', [], ''));
    this.cards.push(this.createCard('513', 'Guardian of the Th', [], ''));
    this.cards.push(this.createCard('514', 'Brave Scizzar', [], ''));
    this.cards.push(this.createCard('515', 'The Statue of East', [], ''));
    this.cards.push(this.createCard('516', 'Muka Muka', [], ''));
    this.cards.push(this.createCard('517', 'Sand Stone', [], ''));
    this.cards.push(this.createCard('518', 'Boulder Tortoise', [], ''));
    this.cards.push(this.createCard('519', 'Fire Kraken', [], ''));
    this.cards.push(this.createCard('520', 'Turtle Bird', [], ''));
    this.cards.push(this.createCard('521', 'Skullbird', [], ''));
    this.cards.push(this.createCard('522', 'Monstrous Bird', [], ''));
    this.cards.push(this.createCard('523', 'The Bistro Butcher', [], ''));
    this.cards.push(this.createCard('524', 'Star Boy', [], ''));
    this.cards.push(this.createCard('525', 'Spirit of the Moun', [], ''));
    this.cards.push(this.createCard('526', 'Neck Hunter', [], ''));
    this.cards.push(this.createCard('527', 'Milus Radiant', [], ''));
    this.cards.push(this.createCard('528', 'Togex', [], ''));
    this.cards.push(this.createCard('529', 'Flame Cerebrus', [], ''));
    this.cards.push(this.createCard('530', 'Eldeen', [], ''));
    this.cards.push(this.createCard('531', 'Mystical Sand', [], ''));
    this.cards.push(this.createCard('532', 'Gemini Elf', [], ''));
    this.cards.push(this.createCard('533', 'Kwagar Hercules', [], ''));
    this.cards.push(this.createCard('534', 'Minar', [], ''));
    this.cards.push(this.createCard('535', 'Kamakiriman', [], ''));
    this.cards.push(this.createCard('536', 'Mechaleon', [], ''));
    this.cards.push(this.createCard('537', 'Mega Thunderball', [], ''));
    this.cards.push(this.createCard('538', 'Niwatori', [], ''));
    this.cards.push(this.createCard('539', 'Corroding Shark', [], ''));
    this.cards.push(this.createCard('540', 'Skelengel', [], ''));
    this.cards.push(this.createCard('541', 'Hane-Hane', [], ''));
    this.cards.push(this.createCard('542', 'Misairuzame', [], ''));
    this.cards.push(this.createCard('543', 'Tongyo', [], ''));
    this.cards.push(this.createCard('544', 'Dharma Cannon', [], ''));
    this.cards.push(this.createCard('545', 'Skelgon', [], ''));
    this.cards.push(this.createCard('546', 'Wow Warrior', [], ''));
    this.cards.push(this.createCard('547', 'Griggle', [], ''));
    this.cards.push(this.createCard('548', 'Bone Mouse', [], ''));
    this.cards.push(this.createCard('549', 'Frog The Jam', [], ''));
    this.cards.push(this.createCard('550', 'Behegon', [], ''));
    this.cards.push(this.createCard('551', 'Dark Elf', [], ''));
    this.cards.push(this.createCard('552', 'Winged Dragon #2', [], ''));
    this.cards.push(this.createCard('553', 'Mushroom Man #2', [], ''));
    this.cards.push(this.createCard('554', 'Lava Battleguard', [], ''));
    this.cards.push(this.createCard('555', 'Tyhone #2', [], ''));
    this.cards.push(this.createCard('556', 'The Wandering Doom', [], ''));
    this.cards.push(this.createCard('557', 'Steel OgreGrotto#1', [], ''));
    this.cards.push(this.createCard('558', 'Pot the Trick', [], ''));
    this.cards.push(this.createCard('559', 'Oscillo Hero', [], ''));
    this.cards.push(this.createCard('560', 'Invader from Anoth', [], ''));
    this.cards.push(this.createCard('561', 'Lesser Dragon', [], ''));
    this.cards.push(this.createCard('562', 'Needle Worm', [], ''));
    this.cards.push(this.createCard('563', 'Wretched Ghost of', [], ''));
    this.cards.push(this.createCard('564', 'Great Mammoth of G', [], ''));
    this.cards.push(this.createCard('565', 'Man-eating Black S', [], ''));
    this.cards.push(this.createCard('566', 'Yormungarde', [], ''));
    this.cards.push(this.createCard('567', 'Darkworld Thorns', [], ''));
    this.cards.push(this.createCard('568', 'Anthrosaurus', [], ''));
    this.cards.push(this.createCard('569', 'Drooling Lizard', [], ''));
    this.cards.push(this.createCard('570', 'Trakadon', [], ''));
    this.cards.push(this.createCard('571', 'B. Dragon Jungle', [], ''));
    this.cards.push(this.createCard('572', 'Empress Judge', [], ''));
    this.cards.push(this.createCard('573', 'Little D', [], ''));
    this.cards.push(this.createCard('574', 'Witch of the Black', [], ''));
    this.cards.push(this.createCard('575', 'Ancient One of the', [], ''));
    this.cards.push(this.createCard('576', 'Giant Scorpion of', [], ''));
    this.cards.push(this.createCard('577', 'Crow Goblin', [], ''));
    this.cards.push(this.createCard('578', 'Leo Wizard', [], ''));
    this.cards.push(this.createCard('579', 'Abyss Flower', [], ''));
    this.cards.push(this.createCard('580', 'Patrol Robo', [], ''));
    this.cards.push(this.createCard('581', 'Takuhee', [], ''));
    this.cards.push(this.createCard('582', 'Dark Witch', [], ''));
    this.cards.push(this.createCard('583', 'Weather Report', [], ''));
    this.cards.push(this.createCard('584', 'Binding Chain', [], ''));
    this.cards.push(this.createCard('585', 'Mechanical Snail', [], ''));
    this.cards.push(this.createCard('586', 'Greenkappa', [], ''));
    this.cards.push(this.createCard('587', 'Mon Larvas', [], ''));
    this.cards.push(this.createCard('588', 'Living Vase', [], ''));
    this.cards.push(this.createCard('589', 'Tentacle Plant', [], ''));
    this.cards.push(this.createCard('590', 'Beaked Snake', [], ''));
    this.cards.push(this.createCard('591', 'Morphing Jar', [], ''));
    this.cards.push(this.createCard('592', 'Muse-A', [], ''));
    this.cards.push(this.createCard('593', 'Fire-eating Turtle', [], ''));
    this.cards.push(this.createCard('594', 'Rose Spectre of Du', [], ''));
    this.cards.push(this.createCard('595', 'Fiend Reflection#1', [], ''));
    this.cards.push(this.createCard('596', 'Hungry Ghoul', [], ''));
    this.cards.push(this.createCard('597', 'Pale Beast', [], ''));
    this.cards.push(this.createCard('598', 'Little Chimera', [], ''));
    this.cards.push(this.createCard('599', 'Violent Rain', [], ''));
    this.cards.push(this.createCard('600', 'Key Mace #2', [], ''));
    this.cards.push(this.createCard('601', 'Tenderness', [], ''));
    this.cards.push(this.createCard('602', 'Penguin Soldier', [], ''));
    this.cards.push(this.createCard('603', 'Fairy Dragon', [], ''));
    this.cards.push(this.createCard('604', 'Obese Marmot of Ne', [], ''));
    this.cards.push(this.createCard('605', 'Liquid Beast', [], ''));
    this.cards.push(this.createCard('606', 'Twin Long Rods #2', [], ''));
    this.cards.push(this.createCard('607', 'Great Bill', [], ''));
    this.cards.push(this.createCard('608', 'Shining Friendship', [], ''));
    this.cards.push(this.createCard('609', 'Bladefly', [], ''));
    this.cards.push(this.createCard('610', 'Electric Lizard', [], ''));
    this.cards.push(this.createCard('611', 'Hiro\'s Shadow Scou', [], ''));
    this.cards.push(this.createCard('612', 'Lady of Faith', [], ''));
    this.cards.push(this.createCard('613', 'Twin-headed Thunde', [], ''));
    this.cards.push(this.createCard('614', 'Hunter Spider', [], ''));
    this.cards.push(this.createCard('615', 'Armored Starfish', [], ''));
    this.cards.push(this.createCard('616', 'Hourglass of Coura', [], ''));
    this.cards.push(this.createCard('617', 'Marine Beast', [], ''));
    this.cards.push(this.createCard('618', 'Warrior of Traditi', [], ''));
    this.cards.push(this.createCard('619', 'Rock Spirit', [], ''));
    this.cards.push(this.createCard('620', 'Snakeyashi', [], ''));
    this.cards.push(this.createCard('621', 'Succubus Knight', [], ''));
    this.cards.push(this.createCard('622', 'Ill Witch', [], ''));
    this.cards.push(this.createCard('623', 'The Thing That Hid', [], ''));
    this.cards.push(this.createCard('624', 'High Tide Gyojin', [], ''));
    this.cards.push(this.createCard('625', 'Fairy of the Fount', [], ''));
    this.cards.push(this.createCard('626', 'Amazon of the Seas', [], ''));
    this.cards.push(this.createCard('627', 'Nekogal #2', [], ''));
    this.cards.push(this.createCard('628', 'Witch\'s Apprentice', [], ''));
    this.cards.push(this.createCard('629', 'Armored Rat', [], ''));
    this.cards.push(this.createCard('630', 'Old Lizard Warrior', [], ''));
    this.cards.push(this.createCard('631', 'Maiden of the Moon', [], ''));
    this.cards.push(this.createCard('632', 'Stone Ogre Grotto', [], ''));
    this.cards.push(this.createCard('633', 'Winged Egg of New', [], ''));
    this.cards.push(this.createCard('634', 'Night Lizard', [], ''));
    this.cards.push(this.createCard('635', 'Queen\'s Double', [], ''));
    this.cards.push(this.createCard('636', 'Blue-winged Crown', [], ''));
    this.cards.push(this.createCard('637', 'Trent', [], ''));
    this.cards.push(this.createCard('638', 'Queen of Autumn Le', [], ''));
    this.cards.push(this.createCard('639', 'Amphibious Bugroth', [], ''));
    this.cards.push(this.createCard('640', 'Acid Crawler', [], ''));
    this.cards.push(this.createCard('641', 'Invader of the Thr', [], ''));
    this.cards.push(this.createCard('642', 'Mystical Sheep #1', [], ''));
    this.cards.push(this.createCard('643', 'Disk Magician', [], ''));
    this.cards.push(this.createCard('644', 'Flame Viper', [], ''));
    this.cards.push(this.createCard('645', 'Royal Guard', [], ''));
    this.cards.push(this.createCard('646', 'Gruesome Goo', [], ''));
    this.cards.push(this.createCard('647', 'Hyosube', [], ''));
    this.cards.push(this.createCard('648', 'Machine Attacker', [], ''));
    this.cards.push(this.createCard('649', 'Hibikime', [], ''));
    this.cards.push(this.createCard('650', 'Whiptail Crow', [], ''));
    this.cards.push(this.createCard('701', 'Performance of Swo', [], ''));
    this.cards.push(this.createCard('702', 'Hungry Burger', [], ''));
    this.cards.push(this.createCard('703', 'Sengenjin', [], ''));
    this.cards.push(this.createCard('704', 'Skull Guardian', [], ''));
    this.cards.push(this.createCard('705', 'Tri-horned Dragon', [], ''));
    this.cards.push(this.createCard('706', 'Serpent Night Dra', [], ''));
    this.cards.push(this.createCard('707', 'Skull Knight', [], ''));
    this.cards.push(this.createCard('708', 'Cosmo Queen', [], ''));
    this.cards.push(this.createCard('709', 'Chakra', [], ''));
    this.cards.push(this.createCard('710', 'Crab Turtle', [], ''));
    this.cards.push(this.createCard('711', 'Mikazukinoyaiba', [], ''));
    this.cards.push(this.createCard('712', 'Meteor Dragon', [], ''));
    this.cards.push(this.createCard('713', 'Meteor B. Dragon', [], ''));
    this.cards.push(this.createCard('714', 'Firewing Pegasus', [], ''));
    this.cards.push(this.createCard('715', 'Psycho-Puppet', [], ''));
    this.cards.push(this.createCard('716', 'Garma Sword', [], ''));
    this.cards.push(this.createCard('717', 'Javelin Beetle', [], ''));
    this.cards.push(this.createCard('718', 'Fortress Whale', [], ''));
    this.cards.push(this.createCard('719', 'Dokurorider', [], ''));
    this.cards.push(this.createCard('720', 'Mask of Shine & Da', [], ''));
    this.cards.push(this.createCard('721', 'Magician of Black', [], ''));
    this.cards.push(this.createCard('723', 'Slot Machine', [], ''));
    this.cards.push(this.createCard('724', 'Space Megatron', [], ''));
    this.cards.push(this.createCard('725', 'Red Archery Girl', [], ''));
    this.cards.push(this.createCard('726', 'Ryu-ran', [], ''));
    this.cards.push(this.createCard('727', 'Manga Ryu-ran', [], ''));
    this.cards.push(this.createCard('728', 'Toon Mermaid', [], ''));
    this.cards.push(this.createCard('729', 'Toon Summoned Skul', [], ''));
    this.cards.push(this.createCard('730', 'Dark-eyes Illusion', [], ''));
    this.cards.push(this.createCard('731', 'Relinquished', [], ''));
    this.cards.push(this.createCard('732', 'Jigen Bakudan', [], ''));
    this.cards.push(this.createCard('733', 'Thousand-eyes Idol', [], ''));
    this.cards.push(this.createCard('734', 'Thousand-eyes Rest', [], ''));
    this.cards.push(this.createCard('735', 'Steel OgreGrotto#2', [], ''));
    this.cards.push(this.createCard('736', 'Blast Sphere', [], ''));
    this.cards.push(this.createCard('737', 'Hyozanryu', [], ''));
    this.cards.push(this.createCard('738', 'Alpha The Magnet W', [], ''));
    this.cards.push(this.createCard('739', 'Legion the Fiend J', [], ''));
    this.cards.push(this.createCard('740', 'Invitation to a Da', [], ''));
    this.cards.push(this.createCard('741', 'Lord of D.', [], ''));
    this.cards.push(this.createCard('742', 'R.eye B. M. Dragon', [], ''));
    this.cards.push(this.createCard('743', 'Barrel Dragon', [], ''));
    this.cards.push(this.createCard('744', 'Hannibal Necromanc', [], ''));
    this.cards.push(this.createCard('745', 'Panther Warrior', [], ''));
    this.cards.push(this.createCard('746', 'Three-headed Geedo', [], ''));
    this.cards.push(this.createCard('747', 'Gazelle the King o', [], ''));
    this.cards.push(this.createCard('748', 'Stone Statue of th', [], ''));
    this.cards.push(this.createCard('749', 'Berfomet', [], ''));
    this.cards.push(this.createCard('750', 'Chimera the Flying', [], ''));
    this.cards.push(this.createCard('751', 'Gear Golem the Mov', [], ''));
    this.cards.push(this.createCard('752', 'Jinzo', [], ''));
    this.cards.push(this.createCard('753', 'Swordsman of Lands', [], ''));
    this.cards.push(this.createCard('754', 'Cyber Raider', [], ''));
    this.cards.push(this.createCard('755', 'The Fiend Megacybe', [], ''));
    this.cards.push(this.createCard('756', 'Reflect Bounder', [], ''));
    this.cards.push(this.createCard('757', 'Beta The Magnet Wa', [], ''));
    this.cards.push(this.createCard('758', 'Big Shield Gardna', [], ''));
    this.cards.push(this.createCard('759', 'Doll of Demise', [], ''));
    this.cards.push(this.createCard('760', 'D. Magician Girl', [], ''));
    this.cards.push(this.createCard('761', 'Alligator\'s Sword', [], ''));
    this.cards.push(this.createCard('762', 'Insect Queen', [], ''));
    this.cards.push(this.createCard('763', 'Parasite Paracide', [], ''));
    this.cards.push(this.createCard('764', 'Skull-mark LadyBug', [], ''));
    this.cards.push(this.createCard('765', 'Tiny Guardian', [], ''));
    this.cards.push(this.createCard('766', 'Pinch Hopper', [], ''));
    this.cards.push(this.createCard('767', 'Blue-eyes Toon Dra', [], ''));
    this.cards.push(this.createCard('768', 'The Unhappy Maiden', [], ''));
    this.cards.push(this.createCard('769', 'Wall of Illusion', [], ''));
    this.cards.push(this.createCard('770', 'Neo the Magic Swor', [], ''));
    this.cards.push(this.createCard('771', 'Man-eating Treasur', [], ''));
    this.cards.push(this.createCard('772', 'Sorcerer of the Do', [], ''));
    this.cards.push(this.createCard('773', 'Sword Hunter', [], ''));
    this.cards.push(this.createCard('774', 'Drill Bug', [], ''));
    this.cards.push(this.createCard('775', 'Deepsea Warrior', [], ''));
    this.cards.push(this.createCard('776', 'Bite Shoes', [], ''));
    this.cards.push(this.createCard('777', 'Spikebot', [], ''));
    this.cards.push(this.createCard('778', 'Ooashi', [], ''));
    this.cards.push(this.createCard('779', 'Satellite Cannon', [], ''));
    this.cards.push(this.createCard('780', 'Mutant Crab', [], ''));
    this.cards.push(this.createCard('791', 'Gate Sword', [], ''));
    this.cards.push(this.createCard('792', 'Steel Fan Fighter', [], ''));
    this.cards.push(this.createCard('793', 'Leopard Girl', [], ''));
    this.cards.push(this.createCard('794', 'The Last Warrior f', [], ''));
    this.cards.push(this.createCard('795', 'Dunames Dark Witch', [], ''));
    this.cards.push(this.createCard('796', 'Garnecia Elefantis', [], ''));
    this.cards.push(this.createCard('797', 'Total Defense Shog', [], ''));
    this.cards.push(this.createCard('798', 'Beast of Talwar', [], ''));
    this.cards.push(this.createCard('799', 'Cyber-tech Alligat', [], ''));
    this.cards.push(this.createCard('800', 'Talons of Shurilan', [], ''));

    this.monsterANames = this.cards.map(x => x.name);
    this.monsterANames.sort();
    this.monsterBNames = this.cards.map(x => x.name);
    this.monsterBNames.sort();
  }
}

export interface Card {
  id: string;
  name: string;
  fusions: Fusion[];
  imgPath: string;
}

export interface Fusion {
  fusesWith: string;
  fusesInto: string;
}