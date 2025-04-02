export interface settingsInterface {
    savings: settingSavingsInterface,
    isAppDisabled: boolean
}

export interface settingSavingsInterface {
    interestRate: number,
    minDuration: number,
    maxDuration: number,
    status: boolean,
}
