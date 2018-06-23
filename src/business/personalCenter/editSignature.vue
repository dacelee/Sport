<template>
    <div class="edit-signature">
        <div class="form">
            <textarea v-model="value"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'edit-signature',
        data() {
            return {
                value: 'Sí, sabes que ya llevo rato mirándote\n' +
                '是的， 你知道我已注视你一会了\n' +
                'Tengo que bailar contigo hoy (DY)\n' +
                '今天我一定要与你共舞一曲 (DY)\n' +
                'Vi que tu mirada ya estaba llamándome\n' +
                '看，你的目光在热切呼唤着我\n' +
                'Muéstrame el camino que yo voy (Oh)\n' +
                '指引我通往你心之路我定风雨无阻\n' +
                'Tú, tú eres el imán y yo soy el metal\n' +
                '你，你就是磁铁而我是被你吸引的金属\n' +
                'Me voy acercando y voy armando el plan\n' +
                '我正接近着你我正周密的策划\n' +
                'Sólo con pensarlo se acelera el pulso (oh yeah!)\n' +
                '意念驱使着我加快了脚步 (Oh yeah)\n' +
                'Ya, ya me está gustando más de lo normal\n' +
                '如今，如今我正享受着行进的快感\n' +
                'Todos mis sentidos van pidiendo más\n' +
                '我身体的每个细胞都在祈求着更多\n' +
                'Esto hay que tomarlo sin ningún apuro\n' +
                '我一定要义无反顾的到你身边\n' +
                'Despacito\n' +
                '轻轻地\n' +
                'Quiero respirar tu cuello despacito\n' +
                '我想贴近你的颈边轻轻地呼吸\n' +
                'Deja que te diga cosas al oido\n' +
                '让我附在你耳边向你吐露真言\n' +
                'Para que te acuerdes si no estás conmigo\n' +
                '让你牢记我的诺言哪怕我不在你身边\n' +
                'Despacito\n' +
                '慢慢地\n' +
                'Quiero desnudarte a besos despacito\n' +
                '我想用吻慢慢地将你的衣衫褪去\n' +
                'Firmo en las paredes de tu laberinto\n' +
                '将你的谜题画在墙上\n' +
                'Y hacer de tu cuerpo todo un manuscrito\n' +
                '让你的身体成为我手稿的绘板\n' +
                'Sube sube\n' +
                'Sube sube\n' +
                'Sube, sube, sube\n' +
                'Sube, sube, sube\n' +
                'Quiero ver bailar tu pelo\n' +
                '我想每日清晨看见你头发起舞\n' +
                'Quiero ser tu ritmo\n' +
                '我想成为你生命的韵律\n' +
                'Que le enseñes a mi boca\n' +
                '我想你向我的唇给与暗示\n' +
                'Tus lugares favoritos (Favorito, favorito baby)\n' +
                '你最喜欢它亲吻的地方（最喜欢的，宝贝）\n' +
                'Déjame sobrepasar tus zonas de peligro\n' +
                '让我越过你身体的危险地带\n' +
                'Hasta provocar tus gritos\n' +
                '直到你抑制不住尖叫\n' +
                'Y que olvides tu apellido\n' +
                '直至你忘记你的姓名\n' +
                'Si te pido un beso ven dámelo\n' +
                '如果我向你索求一个吻，请给我\n' +
                'Yo sé que estás pensandolo\n' +
                '我知道你正在考虑当中\n' +
                'Llevo tiempo intentandolo\n' +
                '我已尝试了一段时间\n' +
                'Mami esto es dando y dandolo\n' +
                '宝贝这只是一个吻 给我吧\n' +
                'Sabes que tu corazón conmigo te hace bom bom\n' +
                '你知道每每见你我的心怦怦直跳\n' +
                'Sabes que esa beba está buscando de mi bom bom\n' +
                '你知道我的心在寻找着它跳动的你\n' +
                'Ven prueba de mi boca para ver como te sabe\n' +
                '来从我的唇里尝尝你的唇是什么滋味\n' +
                'quiero quiero ver cuanto amor a ti te cabe\n' +
                '我想 我想看看你能爱地多深\n' +
                'Yo no tengo prisa yo me quiero dar el viaje\n' +
                '我并不着急，我想带着旅行的心情\n' +
                'Empecemos lento, después salvaje\n' +
                '始于风平浪静，之后疾风暴雨\n' +
                'Pasito a pasito, suave suavecito\n' +
                '一步一步，温柔再温柔一点\n' +
                'Nos vamos pegando, poquito a poquito\n' +
                '我们开始水乳交融，一点一点\n' +
                'cuando tú me besas con esa destreza\n' +
                '当你用熟练的技巧吻我\n' +
                'Veo que eres malicia con delicadeza\n' +
                '我发觉是你对我轻柔的挑逗\n' +
                'Pasito a pasito, suave suavecito\n' +
                '一步一步，温柔再温柔一点\n' +
                'Nos vamos pegando, poquito a poquito\n' +
                '我们开始水乳交融，一点一点\n' +
                'Y es que esa belleza es un rompecabezas\n' +
                '你的美如同未完成的拼图\n' +
                'Pero pa montarlo aquí tengo la pieza\n' +
                '但我余有拼凑的一角\n' +
                'Despacito\n' +
                '轻轻地\n' +
                'Quiero respirar tu cuello despacito\n' +
                '我想贴近你的颈边轻轻地呼吸\n' +
                'Deja que te diga cosas al oido\n' +
                '让我附在你耳边向你吐露真言\n' +
                'Para que te acuerdes si no estás conmigo\n' +
                '让你牢记我的诺言哪怕我不在你身边\n' +
                'Despacito\n' +
                '轻轻地\n' +
                'Quiero desnudarte a besos despacito\n' +
                '我想用吻慢慢地将你衣衫褪去\n' +
                'Firmo en las paredes de tu laberinto\n' +
                '在墙上写下你的难题\n' +
                'Y hacer de tu cuerpo todo un manuscrito\n' +
                '让你的身体成为我手绘的画板\n' +
                'Sube, sube, sube, sube, sube\n' +
                'Sube, sube, sube, sube, sube\n' +
                'Quiero ver bailar tu pelo\n' +
                '我想每日清晨看见你头发起舞\n' +
                'Quiero ser tu ritmo\n' +
                '我想成为你生命的韵律\n' +
                'Que le enseñes a mi boca\n' +
                '我想你向我的唇给与暗示\n' +
                'Tus lugares favoritos (Favorito, favorito baby)\n' +
                '你最喜欢它亲吻的地方（最喜欢的，宝贝）\n' +
                'Déjame sobrepasar tus zonas de peligro\n' +
                '让我越过你身体的危险地带\n' +
                'Hasta provocar tus gritos\n' +
                '直到你抑制不住尖叫\n' +
                'Y que olvides tu apellido\n' +
                '直至你忘记你的姓名\n' +
                'Despacito\n' +
                '轻轻地\n' +
                'Vamos a hacerlo en una playa en Puerto Rico\n' +
                '让我们在波多黎各的海滩完成这个仪式\n' +
                'Hasta que las olas griten "¡Ay, Bendito!"\n' +
                '直到拍起的海浪叫到 哦我的天\n' +
                'Para que mi sello se quede contigo\n' +
                '直到给你留下属于我的烙印\n' +
                'Pasito a pasito, suave suavecito\n' +
                '一步一步，温柔再温柔一点\n' +
                'Nos vamos pegando, poquito a poquito\n' +
                '我们开始水乳交融，一点一点\n' +
                'Que le enseñes a mi boca\n' +
                '我想你向我的唇给与暗示\n' +
                'Tus lugares favoritos (Favorito, favorito baby)\n' +
                '你最喜欢它亲吻的地方（最喜欢的，宝贝）\n' +
                'Pasito a pasito, suave suavecito\n' +
                '一步一步，温柔再温柔一点\n' +
                'Nos vamos pegando, poquito a poquito\n' +
                '我们开始水乳交融，一点一点\n' +
                'Hasta provocar tus gritos\n' +
                '直到你抑制不住尖叫\n' +
                'Y que olvides tu apellido\n' +
                '直至你忘记你的姓名\n' +
                'Despacito\n' +
                '轻轻地'
            }
        },
        methods: {
            editEvent() {
                this.$router.push('/basicInformation')
            }
        }
    }
</script>

<style lang="scss">
    .edit-signature {
        width: 100%;
        .form {
            width: calc(100% - 60px);
            margin: 20px auto;
            textarea {
                height: 300px;
                font-size: 30px;
                line-height: 36px;
                padding: 30px 30px 30px;
                background-color: #333339;
                color: #ffffff;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                margin: 20px auto;
            }
        }
    }
</style>
