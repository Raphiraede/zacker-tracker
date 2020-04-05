state = {
  UserInfo:{
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


create table users (id serial, google_id varchar (30) not null, name varchar (100) not null, email varchar (50) not null, created timestamptz not null, modified timestamptz not null);

create table projects (id serial, name varchar(30) not null, description varchar (1000) not null, owner varchar (30) not null, created timestamptz not null, modified timestamptz not null);

INSERT INTO users VALUES
  (DEFAULT, '112271574383206669193', 'Raphael Raede', 'Raphiraede@gmail.com', NOW(), NOW());

  

INSERT INTO projects VALUES
  (DEFAULT, 'test project', 'hey vsauce michael here', NOW(), NOW()  )

  INSERT INTO projects VALUES
  (DEFAULT, 'test project', 'hey vsauce michael here', NOW(), NOW()  );

  
  select max_conn,used,res_for_super,max_conn-used-res_for_super res_for_normal 
from 
  (select count(*) used from pg_stat_activity) t1,
  (select setting::int res_for_super from pg_settings where name=$$superuser_reserved_connections$$) t2,
  (select setting::int max_conn from pg_settings where name=$$max_connections$$) t3