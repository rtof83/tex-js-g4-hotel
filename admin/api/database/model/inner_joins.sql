SELECT reservation.checkin, service.name FROM reservationservices
INNER JOIN reservation
ON reservationservices.reservationId = reservation.id
INNER JOIN service
ON reservationservices.serviceId = service.id

