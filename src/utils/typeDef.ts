
export interface IRegisterUser{
    username:string;
    email:string;
    password:string;
    phone:string,
    role:"admin" | "halwai" | "user";
}

export interface ILoginUser{
    email:string;
    password:string;
}

export interface IEventCategory {
  _id: string;
  eventCategoryName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


