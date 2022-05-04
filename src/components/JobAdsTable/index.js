import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { URL_PARAMS } from "../../constants";

import './style.css'

const headCells = [
  {
    id: "title",
    label: "Ad Title",
  },
  {
    id: "service",
    label: "Profession",
  },
  {
    id: "municipality",
    label: "Region",
  },
  {
    id: "employmentDescription",
    alignRight: true,
    label: "Weeks",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={"headerColumn column-" + headCell.label}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function JobAdsListTable(props) {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [compactView, setCompactView] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    if (!props.jobAdsList) prepareTableData([]);
    else prepareTableData(props.jobAdsList);
  }, [props.jobAdsList]);

  const prepareTableData = (rawData) => {
    let preparedData = [];
    rawData.forEach((rowData, index) => {
      preparedData.push({
        id: rowData.id,
        title: rowData.title,
        service:
          rowData.service && rowData.service.name ? rowData.service.name : "-",
        municipality:
          rowData.municipality && rowData.municipality.county
            ? rowData.municipality.county
            : "-",
        employmentDescription: rowData.employmentDescription,
      });
    });
    setTableData(preparedData);
  }

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeCompactView = (event) => {
    setCompactView(event.target.checked);
  };

  const handleRowClick = (data) => {
    const parser = new URL(window.location);
    parser.searchParams.set(URL_PARAMS.JOB_DETAILS, data.id);
    console.log(parser.href);
    //window.location = parser.href;
    //navigate(URL_PARAMS.JOB_DETAILS+"/"+);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  return (
    <Box sx={{ width: "100%" }} className="jobAdsTableComponentWrapper">
      <TableContainer className="jobAdsTableContainer">
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="Jobbannonser"
          size={compactView ? "small" : "medium"}
          className="jobAdsTable"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={tableData.length}
          />
          <TableBody>
            {stableSort(tableData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    onClick={() => handleRowClick(row)}
                    key={row.id}
                    className="jobListRow"
                  >
                    <TableCell padding="normal">{row.title}</TableCell>
                    <TableCell padding="normal">{row.service}</TableCell>
                    <TableCell padding="normal">{row.municipality}</TableCell>
                    <TableCell 
                      padding="normal"
                      align="right"
                    >
                      {row.employmentDescription}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (compactView ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={compactView} onChange={handleChangeCompactView} />}
        label="Compact view"
      />
    </Box>
  );
}
