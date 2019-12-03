interface IConfig {
  conversionUrl: string
}
export const config: IConfig = {
  conversionUrl: process.env.REACT_APP_CONVERSION_URL as string
}