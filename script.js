 const cube = document.getElementById('cube');
        const scene = document.getElementById('scene');
        
        // Variáveis globais para guardar a posição atual
        let rotX = -20;
        let rotY = -20;
        
        // Variáveis de controle do Mouse
        let isDragging = false;
        let startX, startY;

        // EVENTOS DO MOUSE
        scene.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            // Remove a transição (animação) enquanto arrasta para não ficar "lento"
            cube.style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            // Sensibilidade do mouse (0.5 deixa mais suave)
            rotY += deltaX * 0.5; 
            rotX -= deltaY * 0.5;

            updateCube();

            startX = e.clientX;
            startY = e.clientY;
        });

        document.addEventListener('mouseup', () => { isDragging = false; });
        document.addEventListener('mouseleave', () => { isDragging = false; });

        // EVENTOS DE TOQUE (Para Celular)
        scene.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            cube.style.transition = 'none';
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            // Previne a rolagem da tela enquanto gira o dado
            e.preventDefault(); 
            
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;

            rotY += deltaX * 0.5;
            rotX -= deltaY * 0.5;

            updateCube();

            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: false });

        document.addEventListener('touchend', () => { isDragging = false; });


        // FUNÇÃO QUE ATUALIZA O CSS
        function updateCube() {
            cube.style.transform = `translateZ(-100px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }


        // FUNÇÃO DO BOTÃO "RODAR"
        function rollDice() {
            // Ativa a animação suave novamente
            cube.style.transition = 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)';

            // Gera rotações aleatórias extras (mínimo 2 voltas completas = 720deg)
            const xRand = (Math.floor(Math.random() * 4) * 90) + 720;
            const yRand = (Math.floor(Math.random() * 4) * 90) + 720;

            // Adiciona aos valores atuais para continuar girando da onde parou
            rotX += xRand;
            rotY += yRand;

            updateCube();
        }