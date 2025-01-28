/* eslint-disable jsx-a11y/img-redundant-alt */
import '../CSS/home.css';

function Home() {
  return (
    <>
    <div className='parent-home'>
      <img src="./img/hero-img.png" id="mainCarPng" className="card-img-top" alt="Car Image" />
      <div className="mainClassDiv">
        <h1>KEY 2 GO</h1>
        <h2>Car Rental</h2>
        <h3>HELPS YOU_____</h3>
        <h4 id="scroll">Here you can rent a car of any brand</h4>
        <br />
        <h6>
          The car Rental revolution: no more paperwork or endless waiting lines,
          <br />
          premium cars guaranteed and your virtual key directly in your smartphone!
        </h6>
      </div>
    </div>
    <div className='info-container'>
      <div className='info-content'>
            <h3>We offer the best experience with our rental deals </h3>
            <ul>
              <li className='info-li'>Best price guaranteed</li>
              <li className='info-li'>Best Condition Cars</li>
              <li className='info-li'>24 hour car delivery</li>
              <li className='info-li'>24/7 technical support</li>
            </ul>
        </div>
        <div className='image'>
        <img src="./img/info-img.png" id="InfoCarPng" className="card-img-top" alt="Car Image" />
        </div>
    </div>
    <h1 className='car-list'>Car List</h1>
    <div className='car-lists'>
    <div className='car-container'>
        <div className='car-box'>
        <img src="./img/car1.png" className="car-list-img"  alt="Car Image" />
          <h2>Car name</h2>
           <h4>Rating 5.0</h4>
           <h4>Features</h4>
           <ul>
            <li>Manual</li>
            <li>4 seater</li>
            <li>Air Conditioning</li>
            <li>Disal</li>
           </ul>
           <button class="btn">Book</button>
        </div>
    </div>
    <div className='car-container'>
        <div className='car-box'>
        <img src="./img/car1.png" className="car-list-img"  alt="Car Image" />
          <h2>Car name</h2>
           <h4>Rating 5.0</h4>
           <h4>Features</h4>
           <ul>
            <li>Manual</li>
            <li>4 seater</li>
            <li>Air Conditioning</li>
            <li>Disal</li>
           </ul>
           <button class="btn">Book</button>
        </div>
    </div>
    <div className='car-container'>
        <div className='car-box'>
        <img src="./img/car1.png" className="car-list-img"  alt="Car Image" />
          <h2>Car name</h2>
           <h4>Rating 5.0</h4>
           <h4>Features</h4>
           <ul>
            <li>Manual</li>
            <li>4 seater</li>
            <li>Air Conditioning</li>
            <li>Disal</li>
           </ul>
           <button class="btn">Book</button>
        </div>
    </div>
    <div className='car-container'>
        <div className='car-box'>
        <img src="./img/car1.png" className="car-list-img"  alt="Car Image" />
          <h2>Car name</h2>
           <h4>Rating 5.0</h4>
           <h4>Features</h4>
           <ul>
            <li>Manual</li>
            <li>4 seater</li>
            <li>Air Conditioning</li>
            <li>Disal</li>
           </ul>
           <button class="btn">Book</button>
        </div>
    </div>
    <div className='car-container'>
        <div className='car-box'>
        <img src="./img/car1.png" className="car-list-img"  alt="Car Image" />
          <h2>Car name</h2>
           <h4>Rating 5.0</h4>
           <h4>Features</h4>
           <ul>
            <li>Manual</li>
            <li>4 seater</li>
            <li>Air Conditioning</li>
            <li>Disal</li>
           </ul>
           <button class="btn">Book</button>
        </div>
    </div>
    <div className='car-container'>
        <div className='car-box'>
        <img src="./img/car1.png" className="car-list-img"  alt="Car Image" />
          <h2>Car name</h2>
           <h4>Rating 5.0</h4>
           <h4>Features</h4>
           <ul>
            <li>Manual</li>
            <li>4 seater</li>
            <li>Air Conditioning</li>
            <li>Disal</li>
           </ul>
           <button class="btn">Book</button>
        </div>
    </div>
    </div>
    <button class='btn-see-car'>See All vehical</button>
    
    </>
  );
}

export default Home;
