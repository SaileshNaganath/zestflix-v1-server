import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name: 'Admin',
            userId: 'admin',
            email: 'admin@example.com',
            userType: 'ADMIN',
            password: bcrypt.hashSync('Admin', 8)
        },
        {
            name: 'Customer',
            userId: 'customer',
            email: 'customer@example.com',
            userType: 'CUSTOMER',
            password: bcrypt.hashSync('Customer', 8)
        },
        {
            name: 'Client',
            userId: 'client',
            email: 'client@example.com',
            userType: 'CLIENT',
            password: bcrypt.hashSync('Client', 8)
        }
    ],
    movies:[
        {
            name: 'Leo',
            description: 'Parthiban is a mild-mannered cafe owner in Kashmir, who fends off a gang of murderous thugs and gains attention from a drug cartel claiming he was once a part of them',
            casts: ['Vijay', 'Trisha'],
            director: 'Lokesh Kanagaraj',
            trailerUrl: 'https://www.youtube.com/watch?v=Po3jStA673E&pp=ygULbGVvIHRyYWlsZXI%3D',
            posterUrl:
              'https://m.media-amazon.com/images/M/MV5BMDk0ZmVmMTktOGNiNS00Yzg5LWIzZTAtNjUxZWZhZDljY2Y0XkEyXkFqcGdeQXVyMTY1MzAyNjU4._V1_SX300.jpg',
            language: 'Tamil',
            releaseDate: '21 November 2023',
            releaseStatus: 'RELEASED' 
        },
        {
            name: 'Pathaan',
            description: 'An Indian agent races against a doomsday clock as a ruthless mercenary, with a bitter vendetta, mounts an apocalyptic attack against the country.',
            casts: ['Shah Rukh Khan', 'Deepika Padukone',, 'John Abraham'],
            director: 'Siddharth Anand',
            trailerUrl: 'https://www.youtube.com/watch?v=vqu4z34wENw&pp=ygUOcGF0aGFuIHRyYWlsZXI%3D',
            posterUrl:
              'https://m.media-amazon.com/images/M/MV5BYTgzNjBjYTctOGJiZi00MTliLTk0YzYtNDJmYTQyMDdkMjQ5XkEyXkFqcGdeQXVyNTkzNDQ4ODc@._V1_SX300.jpg',
            language: 'Hindi',
            releaseDate: '25 January 2023',
            releaseStatus: 'RELEASED'
        },
        {
            name: 'Jawaan',
            description: 'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society',
            casts: ['Shah Rukh Khan', 'Nayanthara','Vijay Sethupathi'],
            director: 'Atlee',
            trailerUrl: 'https://www.youtube.com/watch?v=COv52Qyctws&pp=ygUNamF3YW4gdHJhaWxlcg%3D%3D',
            posterUrl:
              'https://m.media-amazon.com/images/M/MV5BOWI5NmU3NTUtOTZiMS00YzA1LThlYTktNDJjYTU5NDFiMDUxXkEyXkFqcGdeQXVyMTUzNjEwNjM2._V1_SX300.jpg',
            language: 'Hindi',
            releaseDate: '07 September 2023',
            releaseStatus: 'RELEASED'
        }

    ]
       
    }



export default data;




