require('dotenv').config();
const { Pool } = require('pg')


let featuredCards = ''
let featuredModals = ''
let dbresult = ''

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: connectionString });

const query = 'SELECT * FROM project'

pool.query(query, (err, result) => {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    dbresult = result.rows
    dbresult.forEach(element => {

        let number = element.id;
        let project_name = element.project_name;
        let project_note = element.project_note;
        let project_description = element.project_description;
        let project_image = element.project_image;
        let project_image_description = element.project_image_description;
        let bFeatured = element.bFeatured;

        featuredCards += `<div class="card border-dark shadow-lg text-center" data-aos="fade-in" data-aos-duration="1500" data-aos-delay="100">
              <img src="${project_image}" class="card-img-top" alt="${project_image_description}">
              <div class="card-body">
                 <h5>"${project_name}"</h5>
              </div>
              <div class="card-footer">
                 <p>"${project_note}"</p>
                 <!-- <a href="#" class="btn btn-primary w-100">View Project</a> -->
                 <button type="button" class="btn btn-primary w-100" data-toggle="modal" data-target="#Modal${number}">
                    View Project
                 </button>
              </div>
           </div>
           `
        featuredModals += `<!-- Modal -->
            <div class="modal fade" id="Modal${number}" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">${project_name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">${project_description}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            `
    });


    // res.json({
    //     "result": result.rows,
    //     dbresult,
    //     "cards": featuredCards,
    //     "modal": featuredModals
    // })


    // username = req.cookies.username
    if (res.locals.logedIn) {
        res.redirect('/users')
    } else {
        res.render('index', {
            title: 'PRC Engineering',
            activeNav: 'index',
            cards: featuredCards,
            modals: featuredModals
        })
    }


})

pool.end();















function search() {
    // Get the value from the search box
    var searchString = document.getElementById('txtSearch').value;
    // console.log('Searching for: ' + searchString);

    // Set up the parameters to send to the API
    var params =
        '?apikey=your-api-key-here&s=' + encodeURIComponent(searchString);
    var url = 'http://www.omdbapi.com/' + params;

    //call fetch with our url...remember that fetch returns a Promise
    //that must be processed with a call to the .then() method.
    fetch(url)
        .then(function (response) {
            // fetch also returns a stream as the result...we have to tell it
            // how to format the stream...our choices are: json, text, or blob (binary data)
            return response.json();
            // the json() method also returns a promise...so we need
            //to call .then() on it as well (shown on the next line)
        })
        .then(function (data) {
            // we now have our data and can use it to update our page.
            updateResultList(data);
        });
}

function updateResultList(data) {
    console.log('UpdateResultList');
    console.log(data);

    if (data.Search && data.Search.length > 0) {
        const resultList = document.getElementById('ulResults');
        resultList.innerHTML = '';

        // you could use a forEach here as well...it would change the following line like this:
        // data.Search.forEach(function(item){ ...process each item here })
        for (let i = 0; i < data.Search.length; i++) {
            const title = data.Search[i].Title;

            console.log('Adding: ' + title);
            const content = `<li><p>${title}</p></li>`;
            resultList.innerHTML += content;
        }
    }
}