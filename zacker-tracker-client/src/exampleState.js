state = {
  primaryUserData:{
    id: '123',
    givenName:'raphael',
    familyName:'raede',
  },
  projects: {
    'id1' : {
      title: 'fiefdom kingdom',
      description: 'cool game',
      tickets: ['ticketId1', 'ticketId2']
    },
    'id2' : {
      title: 'zacker-tracker',
      description: 'issue tracker',
      tickets: ['id1', 'id2']
    },
  },
  myTickets: {
    'id1': {
      
    }
  },
  tickets: {
    'id1': {
      ticketName: 'fix bug',
      status: 'open/closed',
    },
    'id2': {
      ticketName: 'fix other bug',
      status: 'open/closed',
    },
  },
  users: {
    'userId1': {
      firstName: 'raphi',
      familyName: 'raede'
    }
  }
}