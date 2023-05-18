import { Injectable } from "@angular/core";

import { Http } from "@angular/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
// import { HttpClient } from "@angular/common/http";

@Injectable()
export class SchedulerService {
  constructor(private http: Http) {}

  getServicePoints(userId: string, serviceProviderId: string) {
    return this.http
      .post(environment.servicePointUrl, {
        userID: userId,
        providerServiceMapID: serviceProviderId
      })
      .map(res => res.json())
      .catch(err => {
        return Observable.throw(err);
      });
  }
  getVanMaster(providerServiceMapID){
    //let providerServiceID = localStorage.getItem('providerServiceID')
   return this.http.get(environment.getVanMasterUrl+providerServiceMapID)
     .map(res => res.json());
 }

  getAllEvents(userInfo, year = 0, month = 0, day = 0) {
    return this.http
      .post(`${environment.getAllEventsUrl}/${year}/${month}/${day}`, userInfo)
      .map(res => res.json());
  }

  getTimesheetBySpecialization(specializationDetails) {
    return this.http
      .post(environment.getTimesheetBySpecializationUrl, specializationDetails)
      .map(res => res.json());
  }

  markAvailability(availabilityDetails) {
    return this.http
      .post(environment.markAvailabilityUrl, availabilityDetails)
      .map(res => res.json());
  }

  markNonAvailability(nonAvailabilityDetails) {
    return this.http
      .post(environment.markNonAvailabilityUrl, nonAvailabilityDetails)
      .map(res => res.json());
  }

  getSpecializationMaster() {
    return this.http
      .post(environment.getSpecializationMasterUrl, {})
      .map(res => res.json());
  }

  getSpecialist(specialization) {
    return this.http
      .post(environment.getSpecialistUrl, specialization)
      .map(res => res.json());
  }

  getAllAppointments(requestObj) {
    let reqobj = {
      psmID: requestObj.providerServiceMapID,
      userID: requestObj.specialistID,
      date: requestObj.appointmentDate
    };

    return this.http
      .post(environment.getAllAppointmentUrl, reqobj)
      .map(res => res.json());
  }
  // + localStorage.getItem('providerServiceID') + `/${localStorage.getItem('serviceID')}/${localStorage.getItem('userID')}`

  cancelBeneficiaryTCRequest(tcRequest) {
    return this.http
      .post(environment.cancelBeneficiaryTCRequestUrl, tcRequest)
      .map(res => res.json());
  }

  /**
   * My Staff
   */
  getAllSpecialist(allSpecialistRequest) {
    return this.http
      .post(environment.getAllSpecialistUrl, allSpecialistRequest)
      .map(res => res.json());
  }

  getSpecialistByUserID(specialistByUserIDReq) {
    return this.http
      .get(environment.getSpecialistByUserIDUrl + specialistByUserIDReq)
      .map(res => res.json());
  }

  getSMSType() {
    let serviceID = 4;
    return this.http
      .post(environment.getSMSTypeUrl, { serviceID: serviceID })
      .map(res => res.json());
  }

  getSMSParameter() {
    let serviceID = 4;
    return this.http
      .post(environment.getSMSParameterURL, { serviceID: serviceID })
      .map(res => res.json());
  }

  getAllSMSTemplates(smsTypeID?: any) {
    let providerServiceMapID = localStorage.getItem("tm-providerServiceMapID");
    return this.http
      .post(environment.getAllSMSTemplatesUrl, {
        providerServiceMapID: providerServiceMapID,
        smsTemplateTypeID: smsTypeID ? smsTypeID : undefined
      })
      .map(res => res.json());
  }

  saveSMSTemplate(reqobj) {
    return this.http
      .post(environment.saveSMSTemplateUrl, reqobj)
      .map(res => res.json());
  }

  getFullSMSTemplate(reqobj) {
    return this.http
      .post(environment.getFullSMSTemplateUrl, reqobj)
      .map(res => res.json());
  }

  updateSMSTemplate(reqobj) {
    return this.http
      .post(environment.updateSMSTemplateUrl, reqobj)
      .map(res => res.json());
  }

  /**
   * For Reports
   */
  getChiefComplaintReports(reqobj) {
    return this.http
      .post(environment.getChiefComplaintReportUrl, reqobj)
      .map(res => res.json());
  }
  getTotalConsultationReports(reqObj) {
    return this.http
      .post(environment.getTotalConsultationReportsUrl, reqObj)
      .map(res => res.json());
  }
  getConsultantReport(reqObj) {
    return this.http
      .post(environment.getConsultantReportUrl, reqObj)
      .map(res => res.json());
  }
  getMonthlyReports(reqObj) {
    return this.http
      .post(environment.getMonthlyReportsUrl, reqObj)
      .map(res => res.json());
  }
  getDailyReport(reqObj) {
    return this.http
      .post(environment.getDailyReportUrl, reqObj)
      .map(res => res.json());
  }
}
