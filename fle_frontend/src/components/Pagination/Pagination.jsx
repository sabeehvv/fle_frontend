const Pagination = () => {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  
    return (
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    );
  };

  export default Pagination;