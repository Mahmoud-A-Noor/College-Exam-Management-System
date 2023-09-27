import '../../assets/css/Home/Needs.css'

export default function Needs() {
    return (
        <div id="needs">
            <div id="needs-header">
                <h1>An Online Exam Software that caters to everyone's needs</h1>
            </div>
            <div className='container' style={{"maxWidth":"1200px"}}>
                <div className='row'>
                    <div className='col-lg-4 col-sm-12 justify-content-center'>
                        <div className='need-card'>
                            <h5>Students</h5>
                            <p>Easily take up online or offline exams, and get instant alerts & notifications about exam dates with quicker results; receive ongoing feedback for improvement.</p>
                        </div>
                    </div>
                    <div className='col-lg-4 col-sm-12'>
                        <div className='need-card'>
                            <h5>Faculty</h5>
                            <p>Saves time and energy from doing mundane tasks; easy on-screen evaluation & powerful data-driven insights on academic performance for better teaching.</p>
                        </div>
                    </div>
                    <div className='col-lg-4 col-sm-12'>
                        <div className='need-card'>
                            <h5>Management</h5>
                            <p>Oversee the end-to-end exam activities from a central dashboard; define the scheme of the exams, and assign several roles from a single place. Grab one-click accreditation reports.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}