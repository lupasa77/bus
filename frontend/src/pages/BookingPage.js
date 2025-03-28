import React, { useState } from "react";
import axios from "axios";
import SeatSelection from "../components/SeatSelection";
import "../styles/BookingPage.css";

function BookingPage(props) {
  // Параметры должны быть переданы через props (например, из SearchPage или выбранного тура)
  const { tourId, departureStopId, arrivalStopId } = props;
  
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [passengerData, setPassengerData] = useState({ name: "", phone: "", email: "" });
  const [bookingMessage, setBookingMessage] = useState("");

  // Обработчик выбора места из компонента SeatSelection
  const handleSeatSelect = function(seat) {
    setSelectedSeat(seat.seat_number);
  };

  // Обработчик бронирования (создания билета)
  const handleBooking = function(e) {
    e.preventDefault();
    if (!selectedSeat) {
      setBookingMessage("Выберите место!");
      return;
    }
    axios
      .post("http://127.0.0.1:8000/tickets", {
        tour_id: tourId,
        seat_num: selectedSeat,
        passenger_name: passengerData.name,
        passenger_phone: passengerData.phone,
        passenger_email: passengerData.email,
        departure_stop_id: departureStopId,
        arrival_stop_id: arrivalStopId
      })
      .then(function(res) {
        setBookingMessage("Билет успешно забронирован! Ticket ID: " + res.data.ticket_id);
        // Сброс выбранного места и данных пассажира
        setSelectedSeat(null);
        setPassengerData({ name: "", phone: "", email: "" });
      })
      .catch(function(err) {
        console.error("Ошибка бронирования:", err);
        setBookingMessage("Ошибка при бронировании.");
      });
  };

  return (
    <div className="container">
      <h2>Бронирование билета</h2>
      
      <div className="seat-section">
        <h3>Выберите место в салоне</h3>
        <SeatSelection 
          tourId={tourId}
          departureStopId={departureStopId}
          arrivalStopId={arrivalStopId}
          onSelect={handleSeatSelect}
        />
        {selectedSeat && <p>Вы выбрали место: {selectedSeat}</p>}
      </div>

      <div className="passenger-section">
        <h3>Введите данные пассажира</h3>
        <form onSubmit={handleBooking} className="booking-form">
          <input 
            type="text" 
            placeholder="Имя" 
            value={passengerData.name}
            onChange={(e) => setPassengerData({ ...passengerData, name: e.target.value })}
            required
          />
          <input 
            type="text" 
            placeholder="Телефон" 
            value={passengerData.phone}
            onChange={(e) => setPassengerData({ ...passengerData, phone: e.target.value })}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={passengerData.email}
            onChange={(e) => setPassengerData({ ...passengerData, email: e.target.value })}
          />
          <button type="submit">Забронировать</button>
        </form>
      </div>

      {bookingMessage && <p className="booking-message">{bookingMessage}</p>}
    </div>
  );
}

export default BookingPage;
