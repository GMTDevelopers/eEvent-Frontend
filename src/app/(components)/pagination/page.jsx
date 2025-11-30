import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from './pagination.module.css'



const Pagination = ({currentPage, totalPages, onPageChange}) => {

    const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
        onPageChange(page);
        window.scrollTo({ top: 450, behavior: 'smooth' }); // Optional: scroll to top
    }
    };

    return ( 
        <div>
            {totalPages > 1 && (
                <nav className={styles.pagination} aria-label="Page navigation">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className={styles.pageBtn}>
                    <ChevronLeft size={18} />
                    </button>

                    <button onClick={() => goToPage(1)} disabled={currentPage === 1} className={styles.pageBtn}>
                    First
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </button>
                    ))}

                    <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className={styles.pageBtn}>
                    Last
                    </button>
                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={styles.pageBtn}>
                        <ChevronRight size={18} />
                    </button>
                </nav>
            )}
        </div>
    );
}
 
export default Pagination;