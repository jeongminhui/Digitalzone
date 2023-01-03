import React, { useEffect } from "react";

const TxInfo = ({ txInfo }) => {
  const [rows, setRows] = useState([]);

  const columns = [
    { id: "txnum", label: "트랜잭션번호", minWidth: 100 },
    {
      id: "createdt",
      label: "타임스탬프",
      minWidth: 170,
      // align: "right",
    },
    {
      id: "txhash",
      label: "트랜잭션해시",
      minWidth: 170,
      // align: "right",
    },
    {
      id: "txsize",
      label: "트랜잭션크기",
      minWidth: 170,
      // align: "right",
    },
    {
      id: "txdata",
      label: "데이터",
      minWidth: 170,
      // align: "right",
    },
  ];

  // row 구조
  useEffect(() => {
    setRows({
      txnum: item.txnum,
      createdt: item.createdt,
      txhash: item.txhash,
      txsize: item.txsize,
    });
  }, []);

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                <TableCell>{rows.txnum}</TableCell>
                <TableCell>{rows.createdt}</TableCell>
                <TableCell>{rows.txhash}</TableCell>
                <TableCell>{rows.txsize}</TableCell>
                <TableCell>{rows.blksize}</TableCell>
              </TableRow>
              );
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TxInfo;
