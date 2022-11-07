import Impresora from '@/modules/print/Impresora'
/*****YZX0MAKER <www class="twitter com">@YZX0Long*/
export default {
    namespaced: true,
    state: {
        ini: [], acc: null, prints: []
    },
    mutations: {
        INI(state, payload) {
            state.ini = payload;
        },
        PRT(state, payload) {
            state.prints = payload;
        },
    },
    actions: {
        checkImpresora({ commit }) {
            const printx = []
            Impresora.getImpresoras().then(lista => {
                    lista.forEach(name => {
                        var option = name;
                        printx.push(option);
                    })
                });
            commit('PRT', printx)
        },
        setImpresora({ commit }, value) {
            Impresora.setImpresora(value).then(res => {
                if (res) {
                    console.log(`Impresora ${value} establecida correctamente`);
                } else {
                    console.log(`No se pudo establecer la impresora con el nombre ${value}`);
                }
            });
        },
        async impressTicketTest({ commit }) {
            var impresora = await Impresora.getImpresora().then(name => {
                return name;
            });
            if (impresora === undefined) {
                console.log("Selecciona una impresora");
            } else {
                let impresora = new Impresora("http://localhost:8000");
                impresora.setFontSize(1, 1);
                impresora.setEmphasize(0);
                impresora.setAlign("center");
                impresora.write("TOKENBASE\n");
                impresora.write("///////////\n");
                impresora.write("Telefono: 0000000000\n");
                impresora.write("Fecha/Hora: 000000000000000\n");
                impresora.write("--------------------------------\n");
                impresora.write("Ticket de prueba\n");
                impresora.setAlign("right");
                impresora.write("25 USD\n");
                impresora.write("--------------------------------\n");
                impresora.write("TOTAL: 25 USD\n");
                impresora.write("--------------------------------\n");
                impresora.setAlign("center");
                impresora.write("***Que tenga un buen dia***");
                impresora.cut();
                impresora.cutPartial();
                impresora.end().then(valor => {
                    console.log("Al imprimir: " + valor);
                })
            }
        },
        async impressTicket({ commit }, item) {
            var impresora = await Impresora.getImpresora().then(name => {
                return name;
            });
            if (impresora === undefined) {
                console.log("Selecciona una impresora");
            } else {
                let impresora = new Impresora("http://localhost:8000");
                impresora.setFontSize(1, 1);
                impresora.setEmphasize(0);
                impresora.setAlign("center");
                impresora.write("TOKENBASE.LIVE FACTURE\n");
                impresora.write("///////////\n");
                impresora.write("SE ENVIO A\n");
                impresora.write("///////////\n");
                impresora.write(item.to+"\n");
                impresora.write("FECHA\n");
                impresora.write("///////////\n");
                impresora.write(item.time+"\n");
                impresora.write("--------------------------------\n");
                impresora.write("REF: "+item.id+"\n");
                impresora.setAlign("right");
                impresora.write("COMISION: "+item.tax+" "+ item.alt + "\n");
                impresora.write("--------------------------------\n");
                impresora.write("TOTAL: "+item.total+" "+ item.alt + "\n");
                impresora.write("--------------------------------\n");
                impresora.setAlign("center");
                impresora.write("*Libertad financiera en su mano*");
                impresora.cut();
                impresora.cutPartial();
                impresora.end().then(valor => {
                    console.log("Al imprimir: " + valor);
                })
            }
        },
    },
}
