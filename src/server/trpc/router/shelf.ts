import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const shelfRouter = router({
  create: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.shelf.create({
          data: {
            name: input,
            userId: ctx.session.user.id
          }
        })
      } catch (e) {
        throw e;
      }
    }),
  getShelves: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.prisma.shelf.findMany({
          where: {
            userId: ctx.session.user.id,
          }
        })
      } catch (e) {
        throw e;
      }
    }),
  getBookShelves: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.shelf.findMany({
        where: {
          userId: ctx.session.user.id,
          books: {
            has: input
          }
        }
      });
    }),
  getBooksFromShelf: protectedProcedure
    .input(z.union([z.string(), z.undefined()]))
    .query(async ({ ctx, input }) => {
      if (typeof input === 'undefined') return;
      return ctx.prisma.shelf.findFirst({
        where: {
          id: input
        }
      }).then((res) => res?.books)
    }),
  addBook: protectedProcedure
    .input(z.object({
      bookId: z.string(),
      shelfId: z.union([z.string(), z.array(z.string())]),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        if (typeof input.shelfId === 'object') {
          input.shelfId.forEach(async el => {
            await ctx.prisma.shelf.update({
              data: {
                books: {
                  push: input.bookId
                }
              },
              where: {
                id: el
              }
            }).then((res) => res.id)
          })
          return 'ok';
        }
        if (typeof input.shelfId === 'string') {
          return await ctx.prisma.shelf.update({
            data: {
              books: {
                push: input.bookId
              }
            },
            where: {
              id: input.shelfId
            }
          }).then((res) => res.id)
        }
      } catch (e) {
        return new Error('Something went wrong')
      }

    }),
  removeBook: protectedProcedure
    .input(z.object({
      bookId: z.string(),
      shelfId: z.union([z.string(), z.array(z.string())]),
    }))
    .mutation(async ({ ctx, input }) => {
      if (typeof input.shelfId === 'object') {
        for (let i = 0; i < input.shelfId.length; i++) {
          const bookList = await ctx.prisma.shelf.findFirst({
            where: {
              id: input.shelfId[i],
              userId: ctx.session.user.id
            }
          }).then(shelf => shelf?.books);
          if (typeof bookList === 'undefined') break;
          const filteredList = bookList.filter((book) => book !== input.bookId)
          try {
            await ctx.prisma.shelf.update({
              data: {
                books: {
                  set: filteredList
                }
              },
              where: {
                id: input.shelfId[i]
              },
            })
          } catch (e) {
            throw e
          }

        }
        return 'ok';
      }
      if (typeof input.shelfId === 'string') {
        const bookList = await ctx.prisma.shelf.findFirst({
          where: {
            id: input.shelfId,
            userId: ctx.session.user.id,
          }
        }).then((shelf) => shelf?.books);
        if (typeof bookList === 'undefined') return;
        const filteredList = bookList.filter((book) => book !== input.bookId)
        try {
          return await ctx.prisma.shelf.update({
            data: {
              books: {
                set: filteredList
              }
            },
            where: {
              id: input.shelfId
            },
          })
        } catch (e) {
          throw e
        }
      }

    }),
});
