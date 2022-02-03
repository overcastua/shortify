interface StrategyValidate {
  validate(email: string, password: string): Promise<any>;
}
