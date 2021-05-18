import { Component, OnInit } from '@angular/core';
import { Veri } from '../../tabservice';
import { VeritabService } from '../../veritab.service';
@Component({
  selector: 'app-tabsonuc',
  templateUrl: './tabsonuc.page.html',
  styleUrls: ['./tabsonuc.page.scss'],
})
export class TabsonucPage implements OnInit {

  tc_no;
  constructor(private veri: Veri,public veritab:VeritabService) {
    console.log("tabsonuc acıldı");
    this.tc_no = this.veri.tc_no; //tab servisten gelen tc_no
    console.log("Servisten gelen tc:",this.tc_no)
    this.sonuc_getir();

   }

  ngOnInit() {
    this.tc_no = this.veri.tc_no;
  }

  dizi=[1,2,3,4,5,6,7,8,9];


  tahlil_sonuc=1;

   sonuclar;
   sonuc_getir()
   {
    this.veritab.result(this.tc_no).subscribe((res:any)=>{
      console.log(" sonuclar geldi Basarılı===",res);
      this.sonuclar=res;
      if(this.sonuclar.length) 
      {
        console.log("sonuc geldi"+this.sonuclar.length);
        this.tahlil_sonuc=1;
      }
      else
      {
        console.log("sonuc gelmdi"+this.sonuclar.length);
        this.tahlil_sonuc=0;
      }

      
    },(error:any)=>
    {
      console.log("Hata geldi===",error);
    })
   }


  // degis()
  // {
  //   if(this.tahlil_sonuc==1)
  //   this.tahlil_sonuc=0
  //   else
  //   this.tahlil_sonuc=1;
  // }

  yenile(event) {
    console.log('Sonuc Sayfası yenileme baslıyor');
    this.tc_no = this.veri.tc_no;
    this.sonuc_getir();

    setTimeout(() => {
      console.log('Sonuc Sayfası yenileme bitti');
      event.target.complete();
    }, 2000);
  }

}
