import ServerSettingsModel from "../models/ServerSettingsModel"

export async function getIfUseRR(gId:any){
    return (await ServerSettingsModel.findOne(
        { _id: gId },
        { _id: 0, "reactRoles": 1 }
      )).reactRoles.useReactRoles
}

export async function getIfUseVerification(gId:any){
    return (await ServerSettingsModel.findOne(
        { _id: gId },
        { _id: 0, "verification": 1 }
      )).verification.useVerification
}

export let varifyRole = '974650288780763166'

export async function getVerifyRole(gId:any){
    return (await ServerSettingsModel.findOne(
        { _id: gId },
        { _id: 0, "verification": 1 }
      )).verification
}
export let waitingVarifyRole = '974622107843559444'

export async function getAwatingVerifyRole(gId:any){
    return (await ServerSettingsModel.findOne(
        { _id: gId },
        { _id: 0, "verification": 1 }
      )).verification
}

export async function getWelcomeChannel(gId:any){
    return (await ServerSettingsModel.findOne(
        { _id: gId },
        { _id: 0, "channels": 1 }
      )).channels.joinChannel
}
export let dataVersion = 1