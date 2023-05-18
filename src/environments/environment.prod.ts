// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const commonIP = 'http://10.208.122.38:8080/';
const tmIP = 'http://10.208.122.38:8080/';
const schedulerIP = 'http://10.208.122.38:8080/';

// With API MAN Configuration
// const COMMON_API_OPEN = `http://${IP}:8080/apiman-gateway/IEMR/Common/open/`;
// const COMMON_API = `http://${IP}:8080/apiman-gateway/IEMR/Common/open/`;
// const TM_API = `http://${IP}:8080/apiman-gateway/IEMR/TM/1.0/`;
// const SCHEDULER_API = `http://${IP}:8080/apiman-gateway/IEMR/Scheduling/v1.0/`;

// Without API MAN Configuration
const COMMON_API_OPEN = `${commonIP}commonapi-v1.0/`;
const COMMON_API = `${commonIP}commonapi-v1.0/`;
const SCHEDULER_API = `${schedulerIP}schedulerapi-v1.0/`;
const TM_API = `${tmIP}tmapi-v1.0/`;

export const environment = {
  production: true,

  app: `TM`,

  /**
   * Login and Logout Urls
   */
  loginUrl: `${COMMON_API_OPEN}user/userAuthenticate`,
  logoutUrl: `${COMMON_API_OPEN}user/userLogout`,

  // extendSessionUrl: `${SCHEDULER_API}`,
  extendSessionUrl: `${TM_API}common/extend/redisSession`,
  servicePointUrl: `${TM_API}user/getUserVanSpDetails`,
  getVanMasterUrl: `${TM_API}user/getUserSpokeDetails/`,

  getBeneficiaryDetail: `${TM_API}registrar/get/benDetailsByRegIDForLeftPanelNew`,
  getCompleteBeneficiaryDetail: `${TM_API}registrar/get/beneficiaryDetails`,
  getBeneficiaryImage: `${TM_API}registrar/getBenImage`,

  /**
   * Security Question and Forgot password Url
   */
  getUserSecurityQuestionsAnswerUrl: `${COMMON_API_OPEN}user/forgetPassword`,
  getSecurityQuestionUrl: `${COMMON_API_OPEN}user/getsecurityquetions`,
  saveUserSecurityQuestionsAnswerUrl: `${COMMON_API_OPEN}user/saveUserSecurityQuesAns`,
  setNewPasswordUrl: `${COMMON_API_OPEN}user/setForgetPassword`,

  getSessionExistsURL: `${COMMON_API_OPEN}user/getLoginResponse`,

  getAllEventsUrl: `${SCHEDULER_API}schedule/monthview`,
  getTimesheetBySpecializationUrl: `${SCHEDULER_API}schedule/getdayview`,
  markAvailabilityUrl: `${SCHEDULER_API}schedule/markavailability`,
  markNonAvailabilityUrl: `${SCHEDULER_API}schedule/unmarkavailability`,
  getSpecializationMasterUrl: `${SCHEDULER_API}specialist/masterspecialization`,
  getSpecialistUrl: `${SCHEDULER_API}specialist/getSpecialist`,

  getAllAppointmentUrl: `${TM_API}/tc/getTCRequestList`,
  cancelBeneficiaryTCRequestUrl: `${TM_API}tc/cancel/benTCRequest`,

  getAllSpecialistUrl: `${SCHEDULER_API}/specialist/getSpecialist`,
  getSpecialistByUserIDUrl: `${SCHEDULER_API}specialist/info/`,
  getSMSTypeUrl: `${COMMON_API}sms/getSMSTypes`,
  getSMSParameterURL: `${COMMON_API}sms/getSMSParameters`,
  getAllSMSTemplatesUrl: `${COMMON_API}sms/getSMSTemplates`,
  getFullSMSTemplateUrl: `${COMMON_API}sms/getFullSMSTemplate`,
  saveSMSTemplateUrl: `${COMMON_API}sms/saveSMSTemplate`,
  updateSMSTemplateUrl: `${COMMON_API}sms/updateSMSTemplate`,
  getSwymedLogoutUrl: `${TM_API}swymed/logout`,
  getChiefComplaintReportUrl: `${TM_API}TMReport/chiefcomplaintreport`,
  getTotalConsultationReportsUrl: `${TM_API}TMReport/TotalConsultationReport`,
  getConsultantReportUrl: `${TM_API}TMReport/ConsultationReport`,
  getMonthlyReportsUrl: `${TM_API}TMReport/MonthlyReport`,
  getDailyReportUrl: `${TM_API}TMReport/DailyReport`,
  licenseUrl: `${COMMON_API}license.html`,
  apiVersionUrl: `${SCHEDULER_API}version`,

   // Language List
   getLanguageList: `${COMMON_API}beneficiary/getLanguageList`
};
