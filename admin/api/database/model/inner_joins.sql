SELECT hotel.reserva.checkin, hotel.service.name FROM hotel.reservaServices
INNER JOIN hotel.reserva
ON hotel.reservaServices.reservaId = hotel.reserva.id
INNER JOIN hotel.service
ON hotel.reservaServices.serviceId = hotel.service.id
WHERE hotel.reserva.id = 3;
