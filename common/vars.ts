import ServerSettingsModel from "../models/ServerSettingsModel";

export async function getIfUseRR(gId: any) {
  return (
    await ServerSettingsModel.findOne({ _id: gId }, { _id: 0, reactRoles: 1 })
  ).reactRoles.useReactRoles;
}

export async function getIfUseVerification(gId: any) {
  return (
    await ServerSettingsModel.findOne({ _id: gId }, { _id: 0, verification: 1 })
  ).verification.useVerification;
}

export async function getVerifyRole(gId: any) {
  return (
    await ServerSettingsModel.findOne({ _id: gId }, { _id: 0, verification: 1 })
  ).verification.verifyRole;
}

export async function getAwatingVerifyRole(gId: any) {
  return (
    await ServerSettingsModel.findOne({ _id: gId }, { _id: 0, verification: 1 })
  ).verification.awaitingVarifyRole;
}

export async function getWelcomeChannel(gId: any) {
  return (
    await ServerSettingsModel.findOne({ _id: gId }, { _id: 0, channels: 1 })
  ).channels.joinChannel;
}

export async function getLeaveChannel(gId: any) {
  return (
    await ServerSettingsModel.findOne({ _id: gId }, { _id: 0, channels: 1 })
  ).channels.leaveChannel;
}
export let dataVersion = 1;
export let officalVersion = 1.1;

