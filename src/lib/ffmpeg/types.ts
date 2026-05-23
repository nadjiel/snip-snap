
export interface LogConfig {

  /** Tells whether logs should be stored. */
  store: boolean;
  
  /** Tells whether logs should be printed. */
  print: boolean;

}

export interface Duration {
  start: number;
  end: number;
}
