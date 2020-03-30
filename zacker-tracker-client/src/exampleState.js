state = {
  primaryUserData:{
    id: '123',
    givenName:'raphael',
    familyName:'raede',
    profilePicture: '',
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


create table users (id serial, google_id varchar (20) not null, name varchar (100) not null, email varchar (50) not null, created timestamptz not null, modified timestamptz not null);