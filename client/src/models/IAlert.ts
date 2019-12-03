export interface IAlert {
  color: string;
  errors: IErrors[];
  visible: boolean;
  onDismiss: () => void;
}

export interface IErrors{
  message: string;
}