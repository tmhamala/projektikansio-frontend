import { Component } from '@angular/core';
import {DataService} from './data.service';



@Component({


selector: 'app-faq-component',
template: `


    <div class="default-data-container">

        <div class="col-md-12 col-xs-12 no-padding">

            <div class="well default-well">

                <h3 style="text-align: center; margin-bottom: 50px;">Usein kysyttyjä kysymyksiä</h3>

                <div class="col-xs-12">
                    <h4 class="question-subject">Mikä on Projektikansio.fi?</h4>
                    <p class="question-answer">Projektikansio.fi on palvelu, jossa käyttäjät voivat esitellä ja jakaa omia projektejaan. Palvelu on avoin kaikille.</p>
                </div>

                <div class="col-xs-12" style="margin-top: 40px;">
                    <h4 class="question-subject">Minkälaiset projektit ovat sopivia Projektikansioon?</h4>
                    <p class="question-answer">Projektiksi sopii mikä tahansa tavoite, jonka saavuttamiseen tarvittavat toimenpiteet on jaettavissa pienempiin kokonaisuuksiin eli askeleihin. Projektin tyypillä ei ole väliä. Tärkeintä on, että sitoudut projektin suorittamiseen.<br><br> Projektit eivät kuitenkaan saa olla loukkaavia ja niiden tulee olla hyvän maun mukaisia. Jos projekteissa esiintyy tunnistettavasti muita henkilöitä, tulee kyseisiltä henkilöiltä olla lupa sisällön julkaisemiseen. Käyttäjä vastaa itse kaikesta palveluun lisäämästään sisällöstä. Ylläpitäjä varaa oikeuden poistaa kaiken sopimattoman sisällön palvelusta.</p>
                </div>


                <div class="col-xs-12" style="margin-top: 40px;">
                    <h4 class="question-subject">Minkälainen on hyvä tavoite projektille?</h4>
                    <p class="question-answer">Projektilla tulisi olla päätepiste, jossa voidaan todeta onko projekti onnistunut. Kannustamme asettamaan projektille sellaisen tavoitteen, joka on saavutettavissa. Täysin avoimet projektit, esimerkiksi sellaiset joissa on tavoitteena ylläpitää tiettyä päivittäistä tapaa, tulevat aina epäonnistumaan siihen vääjäämättömään ensimmäiseen kertaan kun päivittäisen askeleen ottaminen jää tekemättä. Sen takia kannustammekin asettamaan projektille päätepisteen muotoilemalla tavoitteen esimerkiksi muotoon "Ylläpidän päivittäistä tapaa X kahden kuukauden ajan". Kaksi kuukautta myöhemmin voidaan tällöin todeta onko projekti onnistunut vai ei. Tavoite voi tottakai elää ja muuttua projektin aikana.</p>
                </div>


                <div class="col-xs-12" style="margin-top: 40px;">
                    <h4 class="question-subject">Miksi tekisin projektin projektikansioon?</h4>
                    <p class="question-answer">Itselleen on helppo luvata asioita. Yhtä helppoa on antaa periksi tavotteistaan. Projektikansion tuoma pieni sosiaalinen paine motivoi projekteissa eteenpäin. Liian vakavamielisesti ei projekteihin kuitenkaan suhtauduta. Jos yksi projekti epäonnistuu, niin koko yhteisömme kannustaa siihen että seuraava on menestyksekäs!</p>
                </div>



                <div class="col-xs-12" style="margin-top: 40px;">
                    <h4 class="question-subject">Voinko osallistua palvelun kehittämiseen?</h4>
                    <p class="question-answer">Tottakai. Jos sinulla on ajatus, siitä minkälaisia ominaisuuksia palvelu kaipaisi niin lähetä viestiä alla olevan kentän kautta ja pyrimme toteuttamaan toiveet parhaamme mukaan. Kaikki ominaisuustoiveet ja parannusehdotukset ovat tervetulleita.</p>
                </div>


                <div class="col-xs-12" style="margin-top: 40px;">
                    <h4 class="question-subject">Minkälaisia uusia ominaisuuksia on odotettavissa?</h4>
                    <p class="question-answer">Alla on listaus ominaisuuksista, jotka ovat suunnitteilla palvelun parantamiseksi.</p>


                   <div class="col-xs-12">
                        <table class="table table-hover" style="background-color:rgba(255, 255, 255, 0.3); border-radius: 10px;">
                            <thead>
                                <tr>
                                    <th>Ominaisuus</th>
                                    <th>Prioriteetti</th>
                                </tr>
                            </thead>


                            <tbody>

                                <tr>
                                    <td class="completed-feature">Tykkäämisominaisuus projektin askelille.</td>
                                    <td class="completed-feature">Korkea</td>
                                </tr>

                                <tr>
                                    <td class="completed-feature">Projektin asettaminen 'valmis' ja 'keskeytynyt' tilaan. Projektien ryhmittely tilan perusteella.</td>
                                    <td class="completed-feature">Korkea</td>
                                </tr>

                                <tr>
                                    <td>Käyttäjän asettaminen seurantaan.</td>
                                    <td>Korkea</td>
                                </tr>


                                <tr>
                                    <td class="completed-feature">Kaikille avoimet haasteet.</td>
                                    <td class="completed-feature">Keskitaso</td>
                                </tr>


                                <tr>
                                    <td class="completed-feature">Tavoiteaikataulun asettaminen projektille sekä seuranta onko projekti aikataulussa.</td>
                                    <td class="completed-feature">Keskitaso</td>
                                </tr>

                                <tr>
                                    <td class="completed-feature">Mahdollisuus vaihtaa projektin kansikuvaa.</td>
                                    <td class="completed-feature">Keskitaso</td>
                                </tr>

                                <tr>
                                    <td class="completed-feature">Huomiomerkinnät tapahtumista (notifications).</td>
                                    <td class="completed-feature">Keskitaso</td>
                                </tr>

                                <tr>
                                    <td class="completed-feature">Mahdollisuus vaihtaa käyttäjän salasana.</td>
                                    <td class="completed-feature">Keskitaso</td>
                                </tr>


                                <tr>
                                    <td>Kielivaihtoehdon englanti lisääminen.</td>
                                    <td>Keskitaso</td>
                                </tr>

                                <tr>
                                    <td class="completed-feature">Projektiaskelten kommentointimahdollisuus.</td>
                                    <td class="completed-feature">Keskitaso</td>
                                </tr>


                                <tr>
                                    <td>Valmiin projektin tulostaminen kirjaksi.</td>
                                    <td>Matala</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>


                <div class="col-xs-12" style="margin-top: 40px;">
                    <h4 class="question-subject" style="margin-bottom: 40px;">Kuka palvelua ylläpitää?</h4>

                    <div class="col-md-1 hidden-xs">
                    </div>


                    <div class="col-md-4 col-xs-12" style="margin-bottom: 30px;">
                    <p>Sivusto on osa Tomi Hämäläisen web-development portfoliota.</p>
                    <p>Voit ottaa yhteyttä ylläpitäjään oheisen viestikentän kautta. Kaikki palaute, parannusehdotukset ja bugilöydökset ovat tervetulleita.</p>
                    <a href="https://www.koodimies.fi">https://www.koodimies.fi</a>
                  </div>


                  <div class="col-md-2 hidden-xs">
                  </div>

                  <div class="col-xs-12 col-md-4" *ngIf="!messageSent">
                    <div class="form-group" style="width: 350px; max-width: 100%; margin-right: 50px;">
                      <input [(ngModel)]="messageSender" style="border: 0px;" type="text" class="form-control input-sm" name="nimi" placeholder="Nimesi">

                      <textarea [(ngModel)]="messageBody" class="form-control" rows="4" style="resize: vertical; height: 150px; border: 0px; margin-top: 10px;" placeholder="Viesti"></textarea>

                      <a class="btn btn-default primary" (click)="sendMessage()" style="margin-top: 15px;"><i class="fa fa-envelope"></i> Lähetä</a>

                    </div>
                  </div>

                  <div class="col-md-4 col-xs-12" *ngIf="messageSent">
                    <h4>Viesti välitetty!</h4>
                  </div>

                  <div class="col-md-1 hidden-xs">
                  </div>


                </div>


                <div class="hidden">
                    <a href="https://www.kiinteistodata.fi">Tutustu myös laadukkaisiin Kiinteistödatan tuotteisiin!</a>
                </div>


                <div class="row"></div>

            </div>
        </div>
    </div>




 `,



})
export class FAQComponent {

    messageBody = '';
    messageSender = '';
    messageSent = false;


    constructor( private dataService: DataService) {
    }



    sendMessage() {

        if (this.messageSender && this.messageBody) {

            const messageData = {
                sender: this.messageSender,
                body: this.messageBody
            };

            this.dataService.sendMessage(messageData)
            .subscribe(data => {
                this.messageSent = true;
            });

       }

    }






}
