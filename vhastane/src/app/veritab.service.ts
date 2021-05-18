import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class VeritabService {

  constructor(public http:HttpClient) { }


  getdoktorappointment(dr_id,tarih_bas,tarih_bit){
    return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/getdoktorappointment.php?dr_id='+dr_id+'&tarih_bas='+tarih_bas+'&tarih_bit='+tarih_bit);
    }
  appointmentaveilable(tarih_bas,tarih_bit,id){
    return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/appointmentaveilable.php?tarih_bas='+tarih_bas+'&tarih_bit='+tarih_bit+'&id='+id);
      }
  aveilable(tarih_bas,tarih_bit,id){
      return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/aveilable.php?tarih_bas='+tarih_bas+'&tarih_bit='+tarih_bit+'&id='+id);
      }    
  // register(data){
  //   return this.http.post('https://projehastane.eastus.cloudapp.azure.com/hastanevt/register.php',data);
  //     }
      register(tc,isim,soyisim,dogum_tarihi,cinsiyet,tel,mail,sifre){
        return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/register.php?tc='+tc+'&isim='+isim+'&soyisim='+soyisim+'&dogum_tarihi='+dogum_tarihi+'&cinsiyet='+cinsiyet
        +'&tel='+tel+'&mail='+mail+'&sifre='+sifre);
          }















  getuser(id,pw){
    return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/getuser.php?id='+id+'&pw='+pw);
                }
  user_control(id){
    return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/usercontrol.php?id='+id);
                }
  patientinfo(id){
    return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/patientinfo.php?id='+id);
                }
  gethospital(){
   return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/gethostpital.php');
               }
  getdepartmant(id){
   return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/getdepartmant.php?id='+id);
               }
  getdoctor(id){
   return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/getdoctor.php?id='+id);
             }
  result(id) {
   return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/result.php?id='+id);
             }       
  // setappointment(data){                                                   
  //  return this.http.post('https://projehastane.eastus.cloudapp.azure.com/hastanevt/setappointment.php',data);
  //             }  
  
    setappointment(tarih,dr,tc,hastane,saat,onay,pol){                                                   
   return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/setappointment.php?id='+tc+'&tarih='+tarih+'&dr='+dr
   +'&hastane='+hastane+'&saat='+saat+'&onay='+onay+'&pol='+pol);
              }  
  getappointment(id,tarih){                                                   
   return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/getappointment.php?id='+id+'&tarih='+tarih);
                    } 
  fullappointment(id,tarih){                                                   
    return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/fullappointment.php?id='+id+'&tarih='+tarih);
                          }                        
  pastappointment(id,tarih){                                                   
    return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/pastappointment.php?id='+id+'&tarih='+tarih);
                           }           
  deleteappointment(id,dr,tarih,saat){                                                   
     return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/deleteappointment.php?id='+id+'&dr='+dr+'&tarih='+tarih+'&saat='+saat);
                            }
  updatemail(id,mail){                                                   
     return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/updatemail.php?id='+id+'&mail='+mail);
                     }   
  updatetel(id,tel){                                                   
     return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/updatetel.php?id='+id+'&tel='+tel);
                     }    
  updatepw(id,pw){                                                   
    return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/updatepw.php?id='+id+'&pw='+pw);
                   }  
  forgetpw(id,mail){                                                   
    return this.http.get('https://projehastane.eastus.cloudapp.azure.com/hastanevt/forgetpw.php?id='+id+'&mail='+mail);
                   }                                                                         
}
