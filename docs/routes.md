# Routes

See the db [schema](https://github.com/CreativeSolutionsGroup/smart-events-api/master/docs/schema.md) to see how these resources fit together.

## EVENTS
| Request Types | Routes |
|-|-|
| `GET` `POST` | `/api/events` |
| `GET` `PUT` `DELETE` | `/api/events/{id}` |

### Parameters 
Required: `name` `description`

## ENGAGEMENTS
| Request Types | Routes |
|-|-|
| `GET` `POST` | `/api/engagements` |
| `GET` `PUT` `DELETE` | `/api/engagements/{id}` |
| `GET` | `/api/engagements/{id}/engagees` |

### Parameters 
Required: `event_id` `keyword` `message` `start_time` `end_time`

Optional: `image_url`

## ENGAGEES
| Request Types | Routes |
|-|-|
| `GET` `POST` | `/api/engagees` |
| `GET` `PUT` `DELETE` | `/api/engagees/{id}` |

### Parameters 
Required: `engagement_id`

Optional: `message_received` `phone`

## ATTRACTIONS
| Request Types | Routes |
|-|-|
| `GET` `POST` | `/api/attractions` |
| `GET` `PUT` `DELETE` | `/api/attractions/{id}` |

### Parameters 
Required: `event_id` `name` `description` `about` `image_url` `start_time` `end_time`

## SLOTS
| Request Types | Routes |
|-|-|
| `GET` `POST` | `/api/slots` |
| `GET` `PUT` `DELETE` | `/api/slots/{id}` |
| `GET` | `/api/slots/{id}/tickets` |

### Parameters 
Required: `attraction_id` `label` `ticket_capacity` `hide_time`

## TICKETS
| Request Types | Routes |
|-|-|
| `GET` `POST` | `/api/tickets` |
| `GET` `PUT` `DELETE` | `/api/tickets/{id}` |

### Parameters 
Required: `slot_id` `student_id`
