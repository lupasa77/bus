from fastapi import APIRouter, Query
from database import get_connection

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/departures")
def get_departures():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT DISTINCT departure_stop_id FROM available WHERE seats > 0
    """)
    departure_stops = [row[0] for row in cur.fetchall()]

    if departure_stops:
        cur.execute("SELECT id, stop_name FROM stop WHERE id = ANY(%s)", (departure_stops,))
        stops_list = [{"id": row[0], "stop_name": row[1]} for row in cur.fetchall()]
    else:
        stops_list = []

    cur.close()
    conn.close()
    return stops_list

@router.get("/arrivals")
def get_arrivals(departure_stop_id: int = Query(...)):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT DISTINCT arrival_stop_id FROM available
        WHERE departure_stop_id = %s AND seats > 0
    """, (departure_stop_id,))
    arrival_stops = [row[0] for row in cur.fetchall()]

    if arrival_stops:
        cur.execute("SELECT id, stop_name FROM stop WHERE id = ANY(%s)", (arrival_stops,))
        stops_list = [{"id": row[0], "stop_name": row[1]} for row in cur.fetchall()]
    else:
        stops_list = []

    cur.close()
    conn.close()
    return stops_list

@router.get("/dates")
def get_dates(departure_stop_id: int, arrival_stop_id: int):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT DISTINCT t.date
        FROM tour t
        JOIN available a ON a.tour_id = t.id
        WHERE a.departure_stop_id = %s AND a.arrival_stop_id = %s AND a.seats > 0
        ORDER BY t.date
    """, (departure_stop_id, arrival_stop_id))
    dates = [row[0] for row in cur.fetchall()]

    cur.close()
    conn.close()
    return dates
