# Sesiones de trabajo — MuVox

Registro cronológico del trabajo hecho en cada sesión de Claude. El objetivo es
**ahorrar tokens**: en vez de releer un chat entero (largo y caro), una sesión
nueva lee solo el último resumen de aquí y retoma el contexto al instante.

---

## Índice de sesiones

| Nº | Fecha | Resumen | Archivo |
|----|-------|---------|---------|
| 01 | 2026-06-01 | Entorno completo + Fases 1-4 (renombrado, color azul, VAD, español) | [sesion-01.md](sesion-01.md) |

---

## Protocolo de sesión

### Al ABRIR una sesión nueva

Pedir a Claude que lea, en este orden:
1. `../README.md` — visión general y estado
2. La **última** sesión de este índice (la de número más alto)
3. `../PLAN.md` — plan maestro por fases

Con eso tiene todo el contexto. **No releer sesiones antiguas completas** salvo que
se busque un detalle específico.

### Al CERRAR una sesión

Pedir a Claude:

> "Cierra la sesión: crea `sesiones/sesion-NN.md` con lo que hemos hecho hoy,
> actualiza el índice de `sesiones/README.md`, el estado en `PLAN.md` y la memoria."

Cada archivo de sesión debe incluir:
- **Objetivo** de la sesión
- **Qué se hizo** (cambios concretos, archivos tocados)
- **Decisiones** importantes y su porqué
- **Problemas** encontrados y cómo se resolvieron
- **Estado al cerrar** y **próximo paso**

---

## Convención de nombres

`sesion-NN.md` con NN de dos dígitos (`sesion-01.md`, `sesion-02.md`...).
Numeración correlativa, independiente de la fecha.
