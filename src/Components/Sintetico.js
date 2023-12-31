import React, { version } from "react";
import style from "../estilo/css/Sintetico.module.css";
import grid from "../estilo/css/Grid.module.css";
import close from "../estilo/img/close-circle-svgrepo-com.svg";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import converteParaReal from "./uteis/ConvertReal";
import { Button } from "@mui/material";
import { themeButton } from "./uteis/TemasCSS";
import { GridToolbarExportContainer } from "@mui/x-data-grid";
import ExportToExcel from "../Helps/ExportToExcel";

function calculaPorcentagem(comi, total) {
  return ((comi / total) * 100).toFixed(2);
}

const Sintetico = ({ modal, setModal, pedidosSinteticos }) => {
  const [filtroTotal, setFiltroTotal] = React.useState(pedidosSinteticos);
  const [filtroComum, setFiltroComum] = React.useState([]);
  const [filtroExclusivo, setFiltroExclusivo] = React.useState([]);
  const [filtroDevolucao, setFiltroDevolucao] = React.useState([]);
  const [filtroAtual, setFiltroAtual] = React.useState([]);
  const [tituloAtual, setTituloAtual] = React.useState({
    titulo: "",
    quantidade: 0,
  });

  const ref = React.useRef();
  function handleClick(e) {
    if (e.target === ref.current) setModal(false);
  }

  React.useState(() => {
    setFiltroAtual(filtroTotal);
    setTituloAtual({
      titulo: "Todos",
      quantidade: filtroTotal.length,
    });
    pedidosSinteticos.forEach((filtro) => {
      if (+calculaPorcentagem(filtro.comissao, filtro.total) === 1) {
        filtroExclusivo.push(filtro);
        filtroExclusivo.color = "red";
      } else if (+calculaPorcentagem(filtro.comissao, filtro.total) < 0) {
        filtroDevolucao.push(filtro);
      } else {
        filtroComum.push(filtro);
      }
    });
  }, []);

  class filtroPedidos {
    constructor(filtro, titulo) {
      this.filtro = filtro;
      this.titulo = titulo;
    }
    setFiltroAtual() {
      setFiltroAtual(null);
      setFiltroAtual(this.filtro);
      setTituloAtual({
        titulo: this.titulo,
        quantidade: this.filtro.length,
      });
    }
  }

  function handleDevolucao() {
    const devolucao = new filtroPedidos(filtroDevolucao, "Devoluções");
    devolucao.setFiltroAtual();
  }

  function handleExclusiva() {
    const exclusiva = new filtroPedidos(filtroExclusivo, "Tabela Exclusiva");
    exclusiva.setFiltroAtual();
  }

  function handleComum() {
    const comum = new filtroPedidos(filtroComum, "Tabela Comum");
    comum.setFiltroAtual();
  }

  function handleTotal() {
    const total = new filtroPedidos(filtroTotal, "Todos os Pedidos");
    total.setFiltroAtual();
  }

  function verificaCor(item, comissao) {
    if (item === 1) {
      return "Exclusiva";
    } else if (comissao < 0) {
      return "Devolução";
    } else return "Comum";
  }

  const columns = [
    { field: "col1", headerName: "Apuração", flex: 0.5 },
    { field: "col2", headerName: "Pedido", flex: 0.5 },
    { field: "col3", headerName: "Cliente", flex: 2 },
    { field: "col4", headerName: "Vendedor", flex: 1 },
    {
      field: "col5",
      headerName: "Valor do Pedido",
      flex: 1,
      ...converteParaReal(),
    },
    { field: "col6", headerName: "%", flex: 0.5 },
    {
      field: "col7",
      headerName: "Comissão",
      flex: 1,
      ...converteParaReal(),
      editable: true,
    },
    { field: "col8", headerName: "Tabela", flex: 1 },
  ];

  const rows = filtroAtual.map((fil, index) => {
    return {
      id: index,
      col1: fil.apuracao,
      col2: fil.pedido,
      col3: fil.cliente,
      col4: fil.vendedor,
      col5: fil.total,
      col6: ((fil.comissao / fil.total) * 100).toFixed(2) + "%",
      col7: fil.comissao,
      col8: verificaCor(fil.color, fil.comissao),
    };
  });

  const ColunasExp = columns.map((col) => col.headerName);
  const LinhasExp = rows.map((row) => [
    row.col1,
    row.col2,
    row.col3,
    row.col4,
    row.col5,
    row.col6,
    row.col7,
    row.col8,
  ]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <GridToolbarExportContainer />
        <ExportToExcel row={LinhasExp} colum={ColunasExp} />
      </GridToolbarContainer>
    );
  }

  return (
    <div ref={ref} onClick={handleClick} className={style.sintetico}>
      <div className={`${style.container} left`}>
        <div onClick={() => setModal(false)} className={style.img}>
          {" "}
          <img src={close} />
        </div>
        <div className={grid.legenda}>
          <Button
            variant="contained"
            style={themeButton.yellow}
            onClick={handleDevolucao}
          >
            Devolução = {filtroDevolucao.length}
          </Button>

          <Button
            variant="contained"
            onClick={handleExclusiva}
            style={themeButton.green}
          >
            Tabela Exclusiva = {filtroExclusivo.length}
          </Button>
          <Button
            style={themeButton.white}
            onClick={handleComum}
            variant="contained"
          >
            Venda Comum = {filtroComum.length}
          </Button>
          <Button
            style={themeButton.black}
            onClick={handleTotal}
            variant="contained"
          >
            Total = {filtroTotal.length}
          </Button>
        </div>
        <h1>{tituloAtual.titulo + " " + tituloAtual.quantidade}</h1>
        <div className={grid.containerTable}>
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: CustomToolbar }}
              sx={{
                "@media print": {
                  ".MuiDataGrid-main": {
                    position: "relative",
                    top: "2000px",
                    pageBreakInside: "avoid",
                    margin: "10mm",
                  },
                },
                "@page": {
                  size: "A1 landscape",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sintetico;
