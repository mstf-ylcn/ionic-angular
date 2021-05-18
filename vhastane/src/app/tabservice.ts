import { Injectable } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
@Injectable({ providedIn: 'root' })


export class Veri {
  
    constructor(private router:Router,private active:ActivatedRoute)
    {
       
    }
    
    public tc_no;

    gonder(tc_no)
    {
      localStorage.setItem('tc_no',tc_no);
      this.tc_no=tc_no;
      console.log("servis:",tc_no);
    }
    
  

}