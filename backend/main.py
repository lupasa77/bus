from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Импортируем все роутеры
from routers import stop, route, pricelist, prices, tour, passenger, report, available, seat, search, ticket

app = FastAPI()

# Настраиваем CORS (если нужно)
origins = ["http://localhost:3000","http://10.4.4.108:3000" ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(stop.router)
app.include_router(route.router)
app.include_router(pricelist.router)
app.include_router(prices.router)
app.include_router(tour.router)
app.include_router(passenger.router)
app.include_router(ticket.router)
app.include_router(report.router)
app.include_router(available.router)
app.include_router(seat.router)
app.include_router(search.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
