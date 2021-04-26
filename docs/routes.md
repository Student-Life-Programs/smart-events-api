# Routes

See the db [schema](https://github.com/CreativeSolutionsGroup/smart-events-api/master/docs/schema.md) to see how these resources fit together.

## EVENTS
| | |
|-|-|
| `GET` `POST` | `/api/events` |
| `GET` `PUT` `DELETE` | `/api/events/{id}` |

### Parameters 
```
{
  name: "Event 1",
  description: "A great event."
}
```

## ENGAGEMENTS
| | |
|-|-|
| `GET` `POST` | `/api/engagements` |
| `GET` `PUT` `DELETE` | `/api/engagements/{id}` |
| `GET` | `/api/engagements/{id}/engagees` |

### Parameters 
```
{
  event_id: "603e985f0e2116517acba07d",
  keyword: "^\d{7}$", // regex
  message: "Welcome to Event 1!",
  start_time: "01/1/2021 10:00 AM",
  end_time: "01/1/2021 11:00 AM",
  image_url: "https://i.redd.it/w3kr4m2fi3111.png" //optional
}
```

## ENGAGEES
| | |
|-|-|
| `GET` `POST` | `/api/engagees` |
| `GET` `PUT` `DELETE` | `/api/engagees/{id}` |

### Parameters 
```
{
  engagement_id: "603e985f0e2116517acba07d",
  message_received: "MORE", // optional
  phone: "+12345678901"     // optional
}
```

## ATTRACTIONS
| | |
|-|-|
| `GET` `POST` | `/api/attractions` |
| `GET` `PUT` `DELETE` | `/api/attractions/{id}` |

### Parameters 
```
{
  event_id: "603e985f0e2116517acba07d",
  name: "Attraction 1",
  description: "More info about the attraction.",
  about: "What one 'ticket' means (one entry, group of 5 entry, etc.)",
  image_url: "https://i.redd.it/w3kr4m2fi3111.png",
  start_time: "01/1/2021 10:00 AM",
  end_time: "01/1/2021 11:00 AM"
}
```

## SLOTS
| | |
|-|-|
| `GET` `POST` | `/api/slots` |
| `GET` `PUT` `DELETE` | `/api/slots/{id}` |
| `GET` | `/api/slots/{id}/tickets` |

### Parameters 
```
{
  attraction_id: "603e985f0e2116517acba07d",
  label: "11pm Movie Showing",
  ticket_capacity: 100,
  hide_time: "01/1/2021 11:00 AM"
}
```

## TICKETS
| Request Types | Routes |
|-|-|
| `GET` `POST` | `/api/tickets` |
| `GET` `PUT` `DELETE` | `/api/tickets/{id}` |

### Parameters 
```
{
  slot_id: "603e985f0e2116517acba07d",
  student_id: "1234567"
}
```
