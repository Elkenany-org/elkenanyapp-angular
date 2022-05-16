// ----------------------------------------- < Start chat > -----------------------------------------------//

export interface StartChat {
  chat: Chat
}
  
  
// ----------------------------------------- < Chats > -----------------------------------------------//
export interface Chats  {
    chat: Massage[]
  }
  
// ----------------------------------------- < Chats massages > -----------------------------------------------//

export interface chatMassages {
    chat: chatMassage
  }
  
export interface chatMassage {
  massages: Massage[]
}
  
// ----------------------------------------- < Add Massage > -----------------------------------------------//

export interface AddMassage {
    chat: Chat
  }


//////////////
  export interface Massage {
    massage: string
    id: number
    created_at: string
    image: string
    name: string
  }
  

  export interface Chat {
    id?: number
    massages: Massage[]
  }
  