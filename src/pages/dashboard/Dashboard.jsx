import './Dashboard.css';

const Dashboard = () => {

    return (
        <div className='dashboard'>
            <header className='db-header db-general'>
                <p>Header</p>
            </header>
            <section className='db-section'>
                <div className='db-sidebar db-general'>
                    <p>Sidebar</p>
                </div>
                <div className='db-content db-general'>
                    <p>Content</p>
                </div>
            </section>
        </div>
    )
}

export default Dashboard